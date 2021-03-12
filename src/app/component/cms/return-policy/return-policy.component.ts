import { Component, OnInit } from '@angular/core';
import { Global } from '@app/shared/global';
import { DataService } from '@app/shared/services/data.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'sb-return-policy',
  templateUrl: './return-policy.component.html',
  styleUrls: ['./return-policy.component.scss']
})
export class ReturnPolicyComponent implements OnInit {

  public Editor = ClassicEditor;
  constructor(
    private _dataService: DataService,
    private _toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {
    this.getReturnPolicy();
  }

  public model = {
    editorData: ''
  };

  submit() {
    let data = {
      name: "returnPolicy",
      content: this.model.editorData
    }
    console.log("data", data);
    this._dataService.postdata(Global.BASE_API_PATH + "createContentPage", data).subscribe(res => {
      if (!res.error) {
        console.log(res);
        this._toastr.success(res.message, "Return Policy")
      } else {
        this._toastr.error(res.message, "Return Policy")
      }
    });
  }

  getReturnPolicy() {
    let data = {
      name: "returnPolicy",
    }
    this._dataService.postdata(Global.BASE_API_PATH + "getContentPageByName", data).subscribe(res => {
      if (!res.error) {

        console.log("data", res.data);

        this.model.editorData = res.data.content;
      } else {
        this._toastr.info(res.message, "Return Policy");
      }
    });
  }
}