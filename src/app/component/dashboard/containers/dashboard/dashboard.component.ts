import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Breadcrumb } from '@app/component//navigation/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    subscription: Subscription = new Subscription();
    breadcrumbs!: Breadcrumb[];

    constructor() {}
    ngOnInit() {}
}
