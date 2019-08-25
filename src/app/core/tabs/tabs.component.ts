import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabsService } from './tabs.service';
import { Tab } from './tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {
  tabs: Map<number, Tab>;

  constructor(private tabsService: TabsService) { }

  ngOnInit() {
    this.tabs = this.tabsService.getTabs();
  }

  switchContent(tab: Tab) {
    this.tabsService.switchTab(tab.id);
  }

  newTab(): void {
    this.tabsService.addTab({ name: 'Welcome', url: '/welcome' });
  }

  log(param) {
    console.log(param);
  }
}
