import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouteData, SideNavItem } from '@app/component/navigation/models';

@Component({
    selector: 'sb-side-nav-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;

    expanded = false;
    routeData!: RouteData;

    constructor() {}
    ngOnInit() {}
}
