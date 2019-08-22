import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TabsServiceService } from '../../providers/tabs-service.service';
import { Tab } from '../../modals/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {
  private subscription: Subscription;
  tabs: any[] = [];
  constructor(private tabsService: TabsServiceService, private router: Router) { }
  ngOnInit() {
    this.subscription = this.tabsService.observableTabs
      .subscribe(tabs => {
        this.tabs = [];
        tabs.forEach(tab =>
          this.tabs.push(tab)
        );
    });
  }
  switchContent(tab: Tab) {
    console.log(tab.link);
    this.router.navigate([tab.link]);
    this.tabsService.changeActId(tab.id);
  }
  getTime() {
    // tslint:disable-next-line:no-bitwise
    return Date.now() / 1000 | 0;
  }
  newTab(): void {
    this.tabsService.addTabs(
      new Tab(this.getTime(), 'Welcome', '/welcome')
    );
    this.tabsService.eventChange();
  }

}
