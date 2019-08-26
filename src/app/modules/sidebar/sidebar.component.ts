import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarDrawerComponent } from './components/sidebar-drawer/sidebar-drawer.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @ViewChild(SidebarDrawerComponent, {static: false})
  private sidebarDrawer: SidebarDrawerComponent;
  isCollapsed = false;

  toggleDrawer(e) {
    this.sidebarDrawer.visible = !this.sidebarDrawer.visible;
    this.sidebarDrawer.title = e.elementRef.nativeElement.innerText;
  }
  constructor() { }

  ngOnInit() {
  }

}
