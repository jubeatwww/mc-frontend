import { Component, OnInit } from '@angular/core';
import { TabsService } from '@@core/tabs/tabs.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(private tabsService: TabsService) { }
  ngOnInit() { }
  changeRoute(link: string, name: string) {
    this.tabsService.push({ name, url: link });
  }
}
