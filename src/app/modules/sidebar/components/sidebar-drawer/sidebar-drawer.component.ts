import { Component } from '@angular/core';
import { TabsService } from '@@core/tabs/tabs.service';

@Component({
  selector: 'app-sidebar-drawer',
  templateUrl: './sidebar-drawer.component.html',
  styleUrls: ['./sidebar-drawer.component.less']
})
export class SidebarDrawerComponent {
  visible = false;
  title: string;
  content;
  blockWeight: number;

  constructor(private tabService: TabsService) {}

  close() {
    this.visible = false;
  }

  evaluateContent() {
    const titleWeight = 2 * this.content.length;
    let itemWeight = 0;
    for (const chain of this.content) {
      itemWeight = itemWeight + chain.categories.length;
    }
    this.blockWeight = (itemWeight + titleWeight) / 3;
  }

  debug() {
      this.evaluateContent();
  }

  routeTo(valueChain, category) {
    this.close();
    this.tabService.push({
      name: category.name,
      url: `/db/wheat/value_chain/${valueChain.code_name}/category/${category.code_name}`,
    });
  }
}
