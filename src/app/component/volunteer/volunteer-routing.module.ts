import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards';
import { RouteData } from '../navigation/models';
import { VolunteerEditComponent } from './volunteer-edit/volunteer-edit.component';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';

const routes: Routes = [
  {
    path: 'volunteer-list',
    data: {
      title: 'Volunteer-List',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/volunteer/volunteer-list',
        },
        {
          text: 'Volunteer / Volunteer-List',
          active: true,

        },
      ],
    } as RouteData,
    canActivate: [AuthGuard],
    component:VolunteerListComponent,
  },
  {
    path: 'volunteer-update',
    data: {
      title: 'Volunteer-Update',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/volunteer/volunteer-update'
        },
        {
          text: 'Volunteer / Volunteer-Update',
          active: true,
        },
      ],
    } as RouteData,
    canActivate: [AuthGuard],
    component:VolunteerEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteerRoutingModule { }
