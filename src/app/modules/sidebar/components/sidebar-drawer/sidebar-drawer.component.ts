import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-drawer',
  templateUrl: './sidebar-drawer.component.html',
  styleUrls: ['./sidebar-drawer.component.less']
})
export class SidebarDrawerComponent implements OnInit {
  visible = false;
  title: string;
  content;
  blockWeight: number;
  close() {
    this.visible = false;
  }
  evaluateContent() {
    const children = this.content.children;
    const titleWeight = 2 * children.length;
    let itemWeight = 0;
    for (const child of children) {
      itemWeight = itemWeight + child.children.length;
    }
    this.blockWeight = (itemWeight + titleWeight) / 3;
  }
  debug() {
      this.evaluateContent();
  }
  ngOnInit() {
  }
}
