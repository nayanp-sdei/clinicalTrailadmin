import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from '@app/shared/global';
import { DataService } from '@app/shared/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'sb-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  category: any;
  addModal: boolean = false;
  addCategory!: FormGroup;
  editForm!: FormGroup;
  subcategory: any;
  public activeTab: number = 0;
  tempData: any;
  EditModal: boolean = false;
  show: boolean = false;
  items: any;
  rowData: any;
  rowId: any;
  rowDatas: any;
  delData: any;
  catDeleteModel: boolean=false;
  SubCatModel: boolean=false;
  constructor(
    private _dataService: DataService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private navRoute: Router,
    private spinner: NgxSpinnerService
  ) {

    this.createaddForm();
    this.createEditForm();
  }
  createaddForm() {
    this.addCategory = this._fb.group({
      parentId: [''],
      name: ['', Validators.compose([Validators.required])],
      isStatus: ['', Validators.compose([Validators.required])]
    });
  }

  createEditForm() {
    this.editForm = this._fb.group({
      id: [0],
      parentId: [''],
      name: ['', Validators.compose([Validators.required])],
      isStatus: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.getAllSubCategory();
    this.getAllCategory();
  }

  getAllCategory() {
    // this.spinner.show();
    this._dataService.getData(Global.BASE_API_PATH + "getAllCategories").subscribe(res => {
      if (!res.error) {
        // this.spinner.hide();
        setTimeout(() => {
          this.category = res.data;
        }, 5000)
      } else {
        // this._toastr.error(res.message, "");
      }
    });
  }

  getAllSubCategory() {
    // this.spinner.show();
    this._dataService.getData(Global.BASE_API_PATH + "getAllSubCategories").subscribe(res => {
      if (!res.error) {
        // this.spinner.hide();
        setTimeout(() => {
          this.subcategory = res.data;
        }, 5000)
      } else {
        // this._toastr.error(res.message, "");
      }
    });
  }
  close() {
    this.addModal = false;
    this.EditModal = false;
    this.catDeleteModel=false;
    this.SubCatModel=false;
    this.reset();
  }
  addToggleModal() {
    this.addModal = true;
  }

  onSubmit() {
    console.log("hit", this.addCategory.value.parentId);
    console.log("data", this.addCategory.value);
    if (this.addCategory.value.parentId == "" || this.addCategory.value.parentId === null) {
      console.log("not", this.addCategory.value.parentId);
      if (this.addCategory.valid) {
        let data = {
          name: this.addCategory.value.name,
          isStatus: this.addCategory.value.isStatus
        }
        console.log("data", data);
        this._dataService.postdata(Global.BASE_API_PATH + "createCategories", data).subscribe(res => {
          if (!res.error) {
            console.log(res);
            this.getAllCategory();
            this._toastr.success(res.message, "Add")
            this.reset();
            this.close();
          } else {
            this._toastr.error(res.message, "Add")
            this.reset();
          }
        });
      } else {
        this._toastr.success("All feilds are required ", "Add");
      }
    } else {
      let data = {
        name: this.addCategory.value.name,
        isStatus: this.addCategory.value.isStatus,
        parentId: this.addCategory.value.parentId
      }
      console.log("notkdsfghsldfkgkl", this.addCategory.value.parentId);
      if (this.addCategory.valid) {
        this._dataService.postdata(Global.BASE_API_PATH + "createSubCategories", data).subscribe(res => {
          if (!res.error) {
            console.log(res);
            this.getAllSubCategory();
            this._toastr.success(res.message, "Add")
            this.reset();
            this.close();
          } else {
            this._toastr.error(res.message, "Add")
            this.reset();
          }
        });
      } else {
        this._toastr.success("All feilds are required ", "Add");
      }
    }
  }
  onUpdateCategory() {

    console.log("data", this.editForm.value);
    if (this.editForm.value.parentId == "" || this.editForm.value.parentId === null) {
      console.log("not", this.editForm.value.parentId);
      if (this.editForm.valid) {
        let data = {
          id: this.editForm.value.id,
          name: this.editForm.value.name,
          isStatus: this.editForm.value.isStatus
        }
        console.log("data", data);
        this._dataService.postdata(Global.BASE_API_PATH + "updateCategories", data).subscribe(res => {
          if (!res.error) {
            console.log(res);
            this.reset();
            this.getAllCategory();
            this._toastr.success(res.message, "Update")
            this.close();
          } else {
            this._toastr.error(res.message, "Update")
            this.reset();
          }
        });
      } else {
        this._toastr.success("All feilds are required ", "Update");
      }
    } else {
      console.log("notkdsfghsldfkgkl", this.editForm.value.parentId);
      if (this.editForm.valid) {
        this._dataService.postdata(Global.BASE_API_PATH + "updateSubCategories", this.editForm.value).subscribe(res => {
          if (!res.error) {
            console.log(res);
            this.reset();
            this.getAllSubCategory();
            this._toastr.success(res.message, "Update")
            this.close();
          } else {
            this._toastr.error(res.message, "Update")
            this.reset();
          }
        });
      } else {
        this._toastr.success("All feilds are required ", "Update");
      }
    }
  }


  editCategory(Id: number) {
    console.log("id", Id);
    let obj = { id: Id }
    this.show = true;
    this._dataService.postdata(Global.BASE_API_PATH + "getCategoriesById", obj).subscribe(res => {
      if (!res.error) {
        console.log("getCategoriesById", res.data);
        this.tempData = res.data
        this.editForm.controls['id'].setValue(this.tempData.id);
        this.editForm.controls['name'].setValue(this.tempData.name);
        this.editForm.controls['isStatus'].setValue(this.tempData.isStatus);
        console.log("editCategory", this.editForm.value);
        this.EditModal = true
        //this._toastr.(res.message, "Category");
      } else {
        this._toastr.info(res.message, "Category");
      }
    });
  }
  editSubCategory(Id: number) {
    this.show = false;
    console.log("id", Id);
    let obj = { id: Id }
    this._dataService.postdata(Global.BASE_API_PATH + "getSubCategoriesById", obj).subscribe(res => {
      if (!res.error) {
        this.tempData = res.data
        this.editForm.controls['id'].setValue(this.tempData.id);
        this.editForm.controls['parentId'].setValue(this.tempData.parentId);
        this.editForm.controls['name'].setValue(this.tempData.name);
        this.editForm.controls['isStatus'].setValue(this.tempData.isStatus);
        console.log("editCategory", this.editForm.value);
        this.EditModal = true
      } else {
        this._toastr.info(res.message, "Category");
      }
    });
  }
  getId(Id: Number) {
    this.delData={"id":Id}
    this.catDeleteModel=true;
    }
  getIds(Id:Number){
    this.delData={"id":Id}
    this.SubCatModel=true
  }
  categoryDelete(){
    console.log(this.delData);
         this._dataService.postdata(Global.BASE_API_PATH + "deleteCategories", this.delData).subscribe(res => {
      if (!res.error) {
        this.close();
        this.getAllCategory();
        this.getAllSubCategory();
        this._toastr.error(res.message, "Category");

      } else {
        this.close();
        this._toastr.info(res.message, "Category");
      }
    });
  }

  Delete() {
    console.log(this.delData);
    this._dataService.postdata(Global.BASE_API_PATH + "deleteSubCategories", this.delData).subscribe(res => {
      if (!res.error) {
        this.close();
        this.getAllSubCategory();
        this._toastr.error(res.message, "Sub-Category");
      } else {
        this.close();
        this._toastr.info(res.message, "Sub-Category");
      }
    });
  }
  chk(Id: number) {
    this.rowId = Id
    let obj = { id: this.rowId }
    this._dataService.postdata(Global.BASE_API_PATH + "isStatusCategory", obj).subscribe(res => {
      if (!res.error) {
        if (res.data.data.isStatus === true) {
          this.getAllCategory();
          this._toastr.success("Category Status is True", "Category");
        } else {

          this.getAllCategory();
          this._toastr.success("Category Status is False", "Category");
        }
      } else {
        this._toastr.info(res.message, "Category");
      }
    });
  }

  chks(Id: number) {
    let obj = { id: Id }
    this._dataService.postdata(Global.BASE_API_PATH + "isStatusSubCategory", obj).subscribe(res => {
      if (!res.error) {
        if (res.data.data.isStatus === true) {
          this.getAllSubCategory();
          this._toastr.success("Sub-Category Status is True", "Sub-Category");
        } else {

          this.getAllSubCategory();
          this._toastr.success("Sub-Category Status is False", "Sub-Category");
        }
      } else {
        this._toastr.info(res.message, "Sub-Category");
      }
    });
  }

  reset() {
    this.addCategory.reset();
    this.editForm.reset();
  }

}
