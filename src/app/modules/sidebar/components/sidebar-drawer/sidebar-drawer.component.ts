import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-drawer',
  templateUrl: './sidebar-drawer.component.html',
  styleUrls: ['./sidebar-drawer.component.less']
})
export class SidebarDrawerComponent implements OnInit {
  visible = false;
  title: string;
  close() {
    this.visible = false;
  }
  ngOnInit() {
  }
}
