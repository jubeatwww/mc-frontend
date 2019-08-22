import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabsServiceService } from '../../providers/tabs-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(private tabsService: TabsServiceService, private router: Router) { }
  ngOnInit() { }
  changeRoute(link: string, name: string) {
    this.router.navigate([link]);
    this.tabsService.setTab(
      this.tabsService.getActId(), link, name
    );
  }
}
