import { Component, OnInit } from '@angular/core';
import { TabsService } from '@@core/tabs/tabs.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(private tabsService: TabsService, private router: Router) { }
  ngOnInit() { }
  changeRoute(link: string, name: string) {
    this.router.navigate([link]);
    this.tabsService.setTab(
      this.tabsService.getActId(), link, name
    );
  }
}
