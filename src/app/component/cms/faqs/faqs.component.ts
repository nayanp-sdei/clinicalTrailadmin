import { Component, OnInit } from '@angular/core';
import { Global } from '@app/shared/global';
import { DataService } from '@app/shared/services/data.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'sb-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(
    private _dataService: DataService,
    private _toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {
    this.getFaqs();
  }

  public model = {
    editorData: ''
  };

  submit() {
    let data = {
      name: "faqs",
      content: this.model.editorData
    }
    console.log("data", data);
    this._dataService.postdata(Global.BASE_API_PATH + "createContentPage", data).subscribe(res => {
      if (!res.error) {
        console.log(res);
        this._toastr.success(res.message, "Faq's")
      } else {
        this._toastr.error(res.message, "Faq's")
      }
    });
  }

  getFaqs() {
    let data = {
      name: "faqs",
    }
    this._dataService.postdata(Global.BASE_API_PATH + "getContentPageByName", data).subscribe(res => {
      if (!res.error) {

        console.log("data", res.data);

        this.model.editorData = res.data.content;
      } else {
        this._toastr.info(res.message, "Faq's");
      }
    });
  }
}