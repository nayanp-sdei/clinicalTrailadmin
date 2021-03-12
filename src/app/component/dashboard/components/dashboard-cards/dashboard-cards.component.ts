import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { Global } from '@app/shared/global';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'sb-dashboard-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
  
  constructor(private _dataService: DataService, private _toastr: ToastrService,  private spinner: NgxSpinnerService) { }
  ngOnInit() {
    
  }
  onChange() {


  }


}
