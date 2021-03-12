import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login',
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('@app/component/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
    },
    {
        path: 'categories',
        loadChildren: () =>
            import('@app/component/categories/categories.module').then(m => m.CategoriesModule),
    },
    {
        path:'cms',
        loadChildren: () =>
        import('@app/component/cms/cms.module').then(m => m.CmsModule),
    }, 
    {
        path:'volunteer',
        loadChildren: () =>
        import('@app/component/volunteer/volunteer.module').then(m => m.VolunteerModule),
    },
    {
        path: 'charts',
        loadChildren: () =>
            import('@app/component/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('@app/component/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('@app/component/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    {
        path: 'tables',
        loadChildren: () =>
            import('@app/component/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    },
    {
        path: 'version',
        loadChildren: () =>
            import('@app/component/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('@app/component/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
