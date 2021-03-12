import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from '@app/shared/global';
import { DataService } from '@app/shared/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sb-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss']
})
export class VolunteerListComponent implements OnInit {
  volunteer: any;
  rowId: any;
  delData: any;
  DeleteModel: boolean = false;

  constructor(
    private _dataService: DataService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private navRoute: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllVolunteer();
  }

  getAllVolunteer() {
    // this.spinner.show();
    this._dataService.getData(Global.BASE_API_PATH + "getAllVolunteer").subscribe(res => {
      if (!res.error) {
        // this.spinner.hide();
        setTimeout(() => {
          this.volunteer = res.data;
          console.log("Data", this.volunteer);

        }, 5000)
      } else {
        // this._toastr.error(res.message, "");
      }
    });
  }
  close() {
    this.DeleteModel = false
  }

  edit(Id: Number) {
    this.navRoute.navigate(['/volunteer/volunteer-update'], { queryParams: { userId: Id } });
  }

  getId(Id: Number) {
    this.delData = { "id": Id }
    this.DeleteModel = true;
  }

  Delete() {
    console.log(this.delData);
    this._dataService.postdata(Global.BASE_API_PATH + "deleteVolunteer", this.delData).subscribe(res => {
      if (!res.error) {
        this.close();
        this.getAllVolunteer();
        this._toastr.error(res.message, "Volunteer");
      } else {
        this.close();
        this._toastr.info(res.message, "Volunteer");
      }
    });
  }

  chk(Id: number) {
    this.rowId = Id
    let obj = { id: this.rowId }
    this._dataService.postdata(Global.BASE_API_PATH + "volunteerStatus", obj).subscribe(res => {
      if (!res.error) {
        if (res.data.isStatus === true) {
          this.getAllVolunteer();
          this._toastr.success("Volunteer Status is True", "Volunteer");
        } else {

          this.getAllVolunteer();
          this._toastr.success("Volunteer Status is False", "Volunteer");
        }
      } else {
        this._toastr.info(res.message, "Volunteer");
      }
    });
  }
}

