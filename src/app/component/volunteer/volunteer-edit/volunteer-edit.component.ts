import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '@app/shared/global';
import { DataService } from '@app/shared/services/data.service';
import { EmailValidator, OnlyCharFieldValidator } from '@app/validations/validations.validator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'sb-volunteer-edit',
  templateUrl: './volunteer-edit.component.html',
  styleUrls: ['./volunteer-edit.component.scss']
})
export class VolunteerEditComponent implements OnInit {
  userId: any;
  editForm!: FormGroup;
  tempData: any;

  constructor(
    private _dataService: DataService,
    private _fb: FormBuilder,
    private navRoute: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private _toastr: ToastrService
  ) {
    this.createEditForm();
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  createEditForm() {
    this.editForm = this._fb.group({
      id: [0],
      firstName: ['', Validators.compose([Validators.required, OnlyCharFieldValidator.validOnlyCharField])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, EmailValidator.validEmail])],
      dob: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zipCode: ['', Validators.compose([Validators.required, Validators.pattern(/^[0][1-9]\d{9}$|^[1-9]\d{4}$/)])],
    });
  }

  ngOnInit(): void {
    // console.log("Data",this.userId);
    this.getVolunteerById();
  }

  getVolunteerById() {
    let obj = { id: this.userId }
    this._dataService.postdata(Global.BASE_API_PATH + "getVolunteerById", obj).subscribe(res => {
      if (!res.error) {
        this.tempData = res.data
        console.log("volunteer Data", res.data);
        this.editForm.controls['id'].setValue(this.tempData.id);
        this.editForm.controls['firstName'].setValue(this.tempData.firstName);
        this.editForm.controls['lastName'].setValue(this.tempData.lastName);
        this.editForm.controls['email'].setValue(this.tempData.email);
        this.editForm.controls['dob'].setValue(this.tempData.dob);
        this.editForm.controls['gender'].setValue(this.tempData.gender);
        this.editForm.controls['address'].setValue(this.tempData.address);
        this.editForm.controls['city'].setValue(this.tempData.city);
        this.editForm.controls['state'].setValue(this.tempData.state);
        this.editForm.controls['zipCode'].setValue(this.tempData.zipCode);
        console.log("editCategory", this.editForm.value);
      } else {

        this._toastr.info(res.message, "Volunteer");
      }
    });
  }

  onSubmit() {
    // this.markFormTouched(this.editForm);
    if (this.editForm.valid) {
      // console.log("data",this.editForm.value);
      this._dataService.postdata(Global.BASE_API_PATH + "updateVolunteer", this.editForm.value).subscribe(res => {
        if (!res.error) {
          console.log(res);
          this.reset();

          this._toastr.success(res.message, "Update")

        } else {
          this._toastr.error(res.message, "Update")
        }

      });
    } else {
      this._toastr.info("All fields are required ", "Volunteer");
    }
  }





  reset() {
    this.editForm.reset();
  }

}
