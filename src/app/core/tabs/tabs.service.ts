import { Injectable } from '@angular/core';
import { Subject, Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { Tab, ITab } from './tab';

enum TabAction {
  ADD,
  DELETE,
  SWITCH,
  MODIFY,
}

interface TabEvent {
  action: TabAction;
  payload: {
    id?: number;
    tab?: Tab | ITab;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private tabs = new Map<number, Tab>();
  private activeTabId = 1;
  private maxId = 1;

  private tabSubscriber = new Subscriber<TabEvent>({
    next: (e: TabEvent) => {
      const { tabs } = this;
      const { action, payload: { id, tab } } = e;
      switch (action) {
        case TabAction.ADD:
          const newId = this._addTab(tab, id);
          this.activeTabId = newId;
          return;
        case TabAction.SWITCH:
          this.activeTabId = id;
          this.router.navigate([tabs.get(id).current.url]);
          return;
        default:
          console.log('undefined action');
          return;
      }
    },
  });

  observableTabs = new Subject<TabEvent>();

  constructor(private router: Router) {
    this.observableTabs.subscribe(this.tabSubscriber);

    this.tabSubscriber.next({
      action: TabAction.ADD,
      payload: {
        id: 1,
        tab: new Tab(1, { name: 'Welcome', url: '/welcome' }),
      },
    });
  }

  public push(tabInfo: ITab, targetId?: number): void {
    const id: number = targetId ? targetId : this.activeTabId;
    this.tabs.get(id).push({ ...tabInfo });
    this.router.navigate([tabInfo.url]);
  }

  public prev(targetId?: number) {
    const id: number = targetId ? targetId : this.activeTabId;
    const tab: ITab = this.tabs.get(id).prev();
    if (tab) {
      this.router.navigate([tab.url]);
    }
  }

  public next(targetId?: number) {
    const id: number = targetId ? targetId : this.activeTabId;
    const tab: ITab = this.tabs.get(id).next();
    if (tab) {
      this.router.navigate([tab.url]);
    }
  }

  public getTabs(): Map<number, Tab> {
    return this.tabs;
  }

  public getActiveTabId(): number {
    return this.activeTabId;
  }

  private _genNextId(): number {
    this.maxId += 1;
    return this.maxId;
  }

  public switchTab(id: number) {
    this.observableTabs.next({
      action: TabAction.SWITCH,
      payload: { id },
    });
  }

  public addTab(tab: Tab | ITab, id?: number): void {
    this.observableTabs.next({
      action: TabAction.ADD,
      payload: { id, tab },
    });
  }

  private _addTab(tab: Tab | ITab, id?: number): number {
    const { tabs } = this;
    if (tab instanceof Tab) {
      tabs.set(tab.id, tab);
      return;
    }

    if (id) {
      if (tabs.has(id)) {
        throw new Error('Tab ID already exists');
      }
      tabs.set(id, new Tab(id, { ...tab }));
      return;
    }

    const newId = this._genNextId();
    tabs.set(newId, new Tab(newId, { ...tab }));
    return newId;
  }
}
