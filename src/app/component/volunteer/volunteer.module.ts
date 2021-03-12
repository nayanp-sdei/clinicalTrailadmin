import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteerRoutingModule } from './volunteer-routing.module';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';
import { VolunteerEditComponent } from './volunteer-edit/volunteer-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../app-common/app-common.module';
import { NavigationModule } from '../navigation/navigation.module';
import { TableModule } from 'primeng/table';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [VolunteerListComponent, VolunteerEditComponent],
  imports: [
    CommonModule,
    VolunteerRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    AppCommonModule,
    NavigationModule,
    FormsModule,
    TableModule,
    BsDatepickerModule
  ]
})
export class VolunteerModule { }
