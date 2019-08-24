import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from './tab';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private tabs = new Map<Number, Tab>();
  private actId = 1;
  observableTabs = new BehaviorSubject< Map<Number, Tab>>(this.tabs);

  constructor() {
    this.tabs.set(1, new Tab(1, 'Welcome', '/welcome'));
  }
  eventChange() {
    this.observableTabs.next(this.tabs);
  }
  getTabs(): Map<Number, Tab> {
    this.eventChange();
    return this.tabs;
  }
  setTab(id: number, link: string, name: string): void {
    this.tabs.set(id, new Tab(id, name, link));
    this.eventChange();
  }
  changeActId(id: number) {
    this.actId = id;
  }
  getActId(): number {
    return this.actId;
  }
  addTabs(tab: Tab): void {
    this.tabs.set(
      tab.id
    , tab);
  }
}
