import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabsService } from './tabs.service';
import { Tab } from './tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {
  public tabs: Tab[];

  constructor(public tabsService: TabsService) { }

  ngOnInit() {
    this.tabs = this.tabsService.getTabs();
  }

  switchContent(id: number) {
    this.tabsService.switchTab(id);
  }

  newTab(): void {
    this.tabsService.addTab({
      name: 'Fertilizer Input (by nutrient)',
      url: '/db/wheat/value_chain/input_suppliers/category/fertilizer_input_by_nutrient'
    });
  }

  log(param) {
    console.log(param);
  }
}
