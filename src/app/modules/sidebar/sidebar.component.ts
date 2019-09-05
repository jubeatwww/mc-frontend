import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarDrawerComponent } from './components/sidebar-drawer/sidebar-drawer.component';
import {DatasetEntryService} from '../../core/dataset-entry/dataset-entry.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @ViewChild(SidebarDrawerComponent, {static: false})
  private sidebarDrawer: SidebarDrawerComponent;
  isCollapsed = false;
  openDrawer(e) {
    this.sidebarDrawer.visible = true;
    const id = e.elementRef.nativeElement.value;
    const sidebarItem = this.datasetEntryService.sidebarItems[id];
    const title = sidebarItem.name;
    this.sidebarDrawer.title = title;
    this.sidebarDrawer.content = sidebarItem;
    this.sidebarDrawer.debug();
  }
  constructor(private datasetEntryService: DatasetEntryService) { }

  ngOnInit() {
  }

}
