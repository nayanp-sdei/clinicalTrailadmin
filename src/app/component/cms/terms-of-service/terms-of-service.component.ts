import { Component, OnInit } from '@angular/core';
import { Global } from '@app/shared/global';
import { DataService } from '@app/shared/services/data.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'sb-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(
    private _dataService: DataService,
    private _toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {
    this.getTermOfService();
  }

  public model = {
    editorData: ''
  };

  submit() {
    let data = {
      name: "termsOfService",
      content: this.model.editorData
    }
    console.log("data", data);
    this._dataService.postdata(Global.BASE_API_PATH + "createContentPage", data).subscribe(res => {
      if (!res.error) {
        console.log(res);
        this._toastr.success(res.message, "Terms Of Service")
      } else {
        this._toastr.error(res.message, "Terms Of Service")
      }
    });
  }

  getTermOfService() {
    let data = {
      name: "termsOfService",
    }
    this._dataService.postdata(Global.BASE_API_PATH + "getContentPageByName", data).subscribe(res => {
      if (!res.error) {

        console.log("data", res.data);

        this.model.editorData = res.data.content;
      } else {
        this._toastr.info(res.message, "Terms Of Service");
      }
    });
  }
}