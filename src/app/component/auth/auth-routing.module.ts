/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteData } from '../navigation/models';


/* Module */
import { AuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';

/* Guards */
import * as authGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login', canActivate: [], component: authContainers.LoginComponent, data: { title: 'Pages Login Health Trials', } as RouteData,
    },
    {
        path: 'register', canActivate: [], component: authContainers.RegisterComponent, data: { title: 'Pages Register Health Trials', } as RouteData,
    },
    {
        path: 'forgot-password', canActivate: [], component: authContainers.ForgotPasswordComponent, data: { title: 'Pages Forgot Password Health Trials', } as RouteData,
    },
    {
        path: 'otp', canActivate: [], component: authContainers.OtpComponent, data: { title: 'Otp Health Trials', } as RouteData,
    },
];

@NgModule({
    imports: [AuthModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
