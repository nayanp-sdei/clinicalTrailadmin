import { Component, OnInit } from '@angular/core';
import { Global } from '@app/shared/global';
import { DataService } from '@app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'sb-email-policy',
  templateUrl: './email-policy.component.html',
  styleUrls: ['./email-policy.component.scss']
})
export class EmailPolicyComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(
    private _dataService: DataService,
    private _toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {
    this.getEmailPolicy();
  }

  public model = {
    editorData: ''
  };

  submit() {
    let data = {
      name: "emailPolicy",
      content: this.model.editorData
    }
    console.log("data", data);
    this._dataService.postdata(Global.BASE_API_PATH + "createContentPage", data).subscribe(res => {
      if (!res.error) {
        console.log(res);
        this._toastr.success(res.message, "Email Policy")
      } else {
        this._toastr.error(res.message, "Email Policy")
      }
    });
  }

  getEmailPolicy() {
    let data = {
      name: "emailPolicy",
    }
    this._dataService.postdata(Global.BASE_API_PATH + "getContentPageByName", data).subscribe(res => {
      if (!res.error) {

        console.log("data", res.data);

        this.model.editorData = res.data.content;
      } else {
        this._toastr.info(res.message, "Email Policy");
      }
    });
  }
}