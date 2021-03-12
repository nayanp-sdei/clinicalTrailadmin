import { Component, OnInit, NgModule } from '@angular/core';
import { Global } from '@app/shared/global';
import { DataService } from '@app/shared/services/data.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sb-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(
    private _dataService: DataService,
    private _toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {
    this.getAboutUs();
  }

  public model = {
    editorData: ''
  };

  submit() {
    let data = {
      name: "aboutUs",
      content: this.model.editorData
    }
    console.log("data", data);
    this._dataService.postdata(Global.BASE_API_PATH + "createContentPage", data).subscribe(res => {
      if (!res.error) {
        console.log(res);
        this._toastr.success(res.message, "About-Us")
      } else {
        this._toastr.error(res.message, "About-Us")
      }
    });
  }

  getAboutUs() {
    let data = {
      name: "aboutUs",
    }
    this._dataService.postdata(Global.BASE_API_PATH + "getContentPageByName", data).subscribe(res => {
      if (!res.error) {

        console.log("data", res.data);

        this.model.editorData = res.data.content;
      } else {
        this._toastr.info(res.message, "About-Us");
      }
    });
  }
}