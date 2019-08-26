import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabsService } from './tabs.service';
import { Tab } from './tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {
  tabs: Tab[];

  constructor(private tabsService: TabsService) { }

  ngOnInit() {
    this.tabs = this.tabsService.getTabs();
  }

  switchContent(id: number) {
    this.tabsService.switchTab(id);
  }

  newTab(): void {
    this.tabsService.addTab({ name: 'Welcome', url: '/welcome' });
  }

  log(param) {
    console.log(param);
  }
}
