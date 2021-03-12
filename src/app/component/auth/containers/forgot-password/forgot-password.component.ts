import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '@app/shared/services/data.service';
import { Global } from '@app/shared/global';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'sb-forgot-password',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    forgotForm!: FormGroup;
    // strMsg!: string;

    constructor(
        private _authService: AuthService,
        private _dataService: DataService,
        private _fb: FormBuilder,
        private _toastr: ToastrService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) { }
    ngOnInit() {
        // this._authService.logout();
        this.createForgotForm();
     }
    createForgotForm() {
        this.forgotForm = this._fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])]
        });
    }
    onSubmit() {
        if (this.forgotForm.get('email')?.value == "") {
            this._toastr.error("Email is required!!", "Forgot Password");
            return;
        } 
        if (this.forgotForm.valid) {
            console.log("hit");
            this.spinner.show();
            this._dataService.post(Global.BASE_API_PATH + "forgotpassword", this.forgotForm.value).subscribe(res => {
                if (!res.error) {
                    this._toastr.success("Sent link to reset password", "Forgot Password");
                    this.router.navigate(['dashboard']);
                    this.spinner.hide();
                    this.reset();
                } else {
                    this._toastr.error("Invalid email !!", "Forgot Password");
                    this.spinner.hide();
                    this.reset();
                }
            });
        }

    }
    reset() {
        this.forgotForm.reset();
    }
}
