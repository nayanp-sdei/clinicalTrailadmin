import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Breadcrumb } from '@app/component//navigation/models';
import { NavigationService } from '@app/component//navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-breadcrumbs',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    breadcrumbs!: Breadcrumb[];

    constructor(public navigationService: NavigationService) {}
    ngOnInit() {
        this.subscription.add(
            this.navigationService.routeData$().subscribe(routeData => {
                this.breadcrumbs = routeData.breadcrumbs;
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
