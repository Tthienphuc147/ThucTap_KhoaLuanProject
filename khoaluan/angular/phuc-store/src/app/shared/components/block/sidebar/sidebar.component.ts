import { SidenavMenu } from './../../../models/sidebar-menu.model';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: SidenavMenu;
  @Input() depth: number;

  constructor(public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    // this.sidenavMenuService.currentUrl.subscribe((url: string) => {
    //   if (this.item.route && url) {
    //     // console.log(`Checking '/${this.item.route}' against '${url}'`);
    //     this.expanded = url.indexOf(`/${this.item.route}`) === 0;
    //     this.ariaExpanded = this.expanded;
    //     // console.log(`${this.item.route} is expanded: ${this.expanded}`);
    //   }
    // });
  }
  onItemSelected(item: SidenavMenu) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

}
