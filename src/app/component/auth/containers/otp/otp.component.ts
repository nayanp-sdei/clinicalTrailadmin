import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from '@app/shared/global';
import { global } from '@angular/compiler/src/util';
import { MustMatchValidator, OnlyCharFieldValidator } from '../../../../validations/validations.validator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'sb-otp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpForm !: FormGroup
  userId: any;
  email: any;
  resetPasswordToken: any;

  constructor(
    private route: ActivatedRoute,
    private _dataService: DataService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService

  ) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log("userId", this.userId);
    });
  }
  ngOnInit(): void {
    this.createOtpForm();
    this.getAdminById();
  }
  createOtpForm() {
    this.otpForm = this._fb.group({
      newPassword: ['', Validators.compose([Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.required])]
    });
  }

  getAdminById() {
    let id = { id: this.userId };
    this._dataService.post(Global.BASE_API_PATH + "getAdminById", id).subscribe(res => {
      if (!res.error) {
        console.log("hit", res.data);
        this.email = res.data.email;
        this.resetPasswordToken = res.data.resetPasswordToken
        // this.router.navigate(['dashboard']);

      } else {
        this._toastr.error("Invalid link !!", "Reset Password")

      }
    })
  }

  onSubmit() {
    if (this.otpForm.get('newPassword')?.value == "") {
      this._toastr.error("New Password is required!!", "Reset Password");
      return;
    }
    if (this.otpForm.get('confirmNewPassword')?.value == "") {
      this._toastr.error("Confirm New Password is required!!", "Reset Password");
      return;
    }
    if (this.otpForm.get('newPassword')?.value !== this.otpForm.get('confirmNewPassword')?.value) {
      this._toastr.error("Password does not match!!", "Reset Password");
      this.reset();
      return;
    } else {
      if (this.otpForm.valid) {
        this.spinner.show();
        console.log("hit");
        let data = {
          email: this.email,
          resetPasswordToken: this.resetPasswordToken,
          newPassword: this.otpForm.value.newPassword,
          confirmNewPassword: this.otpForm.value.confirmNewPassword
        }
        if (this.resetPasswordToken) {
          this._dataService.post(Global.BASE_API_PATH + "validateToken", data).subscribe(res => {
            if (!res.error) {
              this._toastr.success(res.message, "Reset Password");
              this.router.navigate(['./auth/login']);
              this.spinner.hide();
              this.reset();
            } else {
              this._toastr.error("Invalid email !!", "Reset Password")
              this.spinner.hide();
              this.reset();
            }
          });
        } else {
          this._toastr.error("Session Expired !!", "Reset Password")
          this.router.navigate(['./auth/login']);
          this.spinner.hide();

        }

      }

    }


  }
  reset() {
    this.otpForm.reset();
  }
}