/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteData } from '@app/component/navigation/models';

/* Module */
import { ErrorModule } from './error.module';

/* Containers */
import * as errorContainers from './containers';

/* Guards */
import * as errorGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '404',
    },
    {
        path: '401',
        canActivate: [],
        component: errorContainers.Error401Component,
        data: {
            title: 'Error 401 - SB Admin Angular',
        } as RouteData,
    },
    {
        path: '404',
        canActivate: [],
        component: errorContainers.Error404Component,
        data: {
            title: 'Error 404 - SB Admin Angular',
        } as RouteData,
    },
    {
        path: '500',
        canActivate: [],
        component: errorContainers.Error500Component,
        data: {
            title: 'Error 500 - SB Admin Angular',
        } as RouteData,
    },
    {
        path: '**',
        pathMatch: 'full',
        component: errorContainers.Error404Component,
    },
];

@NgModule({
    imports: [ErrorModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ErrorRoutingModule {}
