import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Global } from '@app/shared/global';

import { AuthService } from '../../services/auth.service';
import { DataService } from '@app/shared/services/data.service';


@Component({
	selector: 'sb-login',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './login.component.html',
	styleUrls: ['login.component.scss'],
})

export class LoginComponent implements OnInit {
	submitted: boolean = false;
	loginForm!: FormGroup;
	strMsg!: string;
	disableSubmit1: Boolean = false;

	constructor(
		private _authService: AuthService,
		private _dataService: DataService,
		private _fb: FormBuilder,
		private _toastr: ToastrService,
	) { }

	ngOnInit(): void {
		this.strMsg = "";
		this._authService.logout();
		this.createLoginForm();
	}

	createLoginForm() {
		this.loginForm = this._fb.group({
			email: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
			password: ['', Validators.compose([Validators.required])],
		});
	}


	onLogin() {
		if (this.loginForm.invalid) {
			return;
		}

		this.submitted = true;
		this._dataService.post(`${Global.BASE_API_PATH}adminlogin`, this.loginForm.value).subscribe(res => {
			if (!res.error) {
				this._authService.login(res.data);
				this.strMsg = this._authService.getMessage();
				this.submitted = false;
			} else {
				this.submitted = false;
				this._toastr.error("Invalid email or password!!!!!", "Login");
			}
		});
	}
}
