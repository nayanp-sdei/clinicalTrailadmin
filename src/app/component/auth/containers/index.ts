import { from } from 'rxjs';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterComponent } from './register/register.component';

export const containers = [LoginComponent, RegisterComponent, ForgotPasswordComponent, OtpComponent
];

export * from './login/login.component';
export * from './register/register.component';
export * from './forgot-password/forgot-password.component';
export * from './otp/otp.component'


