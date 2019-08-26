import { Injectable } from '@angular/core';
import { Subject, Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { Tab, INavigation } from './tab';

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
    tab?: Tab | INavigation;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private tabs: Tab[] = [];
  private activeTabId = 0;
  private maxId = 0;

  private tabSubscriber = new Subscriber<TabEvent>({
    next: (e: TabEvent) => {
      const { tabs } = this;
      const { action, payload: { id, tab } } = e;
      switch (action) {
        case TabAction.ADD:
          const newId = this._addTab(tab);
          this.activeTabId = newId;
          if (tab instanceof Tab) {
            this.router.navigate([tab.current.url]);
          } else {
            this.router.navigate([tab.url]);
          }
          return;
        case TabAction.SWITCH:
          this.activeTabId = id;
          this.router.navigate([tabs[id].current.url]);
          return;
        default:
          console.log('undefined action');
          return;
      }
    },
  });

  tabs$ = new Subject<TabEvent>();

  constructor(private router: Router) {
    this.tabs$.subscribe(this.tabSubscriber);

    this.tabSubscriber.next({
      action: TabAction.ADD,
      payload: {
        id: 0,
        tab: new Tab(0, { name: 'Welcome', url: '/welcome' }),
      },
    });
  }

  public push(navigateInfo: INavigation, targetId?: number): void {
    const id: number = targetId ? targetId : this.activeTabId;
    this.tabs[id].push({ ...navigateInfo });
    this.router.navigate([navigateInfo.url]);
  }

  public prev(targetId?: number) {
    const id: number = targetId ? targetId : this.activeTabId;
    const nav: INavigation = this.tabs[id].prev();
    if (nav) {
      this.router.navigate([nav.url]);
    }
  }

  public next(targetId?: number) {
    const id: number = targetId ? targetId : this.activeTabId;
    const nav: INavigation = this.tabs[id].next();
    if (nav) {
      this.router.navigate([nav.url]);
    }
  }

  public getTabs(): Tab[] {
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
    this.tabs$.next({
      action: TabAction.SWITCH,
      payload: { id },
    });
  }

  public addTab(tab: Tab | INavigation): void {
    this.tabs$.next({
      action: TabAction.ADD,
      payload: { tab },
    });
  }

  private _addTab(tab: Tab | INavigation): number {
    const { tabs } = this;
    if (tab instanceof Tab) {
      tabs.push(tab);
      if (tab.id > this.maxId) {
          this.maxId = tab.id;
      }
      return tab.id;
    }

    const newId = this._genNextId();
    tabs.push(new Tab(newId, { ...tab }));
    return newId;
  }
}
