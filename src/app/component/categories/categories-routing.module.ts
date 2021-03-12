import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards';
import { RouteData } from '../navigation/models';

import { CategoriesListComponent } from './categories-list/categories-list.component';


const ROUTES: Routes = [
    {
        path: 'categories-List',
        canActivate: [AuthGuard],
        component: CategoriesListComponent,
        data: {
            title: 'Categories-List',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Categories / Categories List',
                    active: true,
                },
            ],
        } as RouteData,
    },

];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }

