import { Component, OnInit } from '@angular/core';

import { TabsService } from '@@core/tabs/tabs.service';
import { Tab } from '@@core/tabs/tab';
import { DatasetEntryService } from '../dataset-entry/dataset-entry.service';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.less']
})
export class CommandBarComponent implements OnInit {

  inputValue: string;
  valueChainData = [];
  filteredValueChainData = [];

  constructor(private tabService: TabsService, private datasetEntryService: DatasetEntryService) { }

  ngOnInit() {
    this.datasetEntryService.getValueChain()
      .subscribe(data => {
        this.valueChainData = data;
        this.filteredValueChainData = data;
      });
  }

  onChange(value: string) {
    if (!value) {
      this.filteredValueChainData = this.valueChainData;
    }
    const searchString = value
      .toLowerCase()
      .replace(/[^\w]$/, '')
      .replace(/[^\w]/, '_');

    const filteredValueChainData = [];
    this.valueChainData.forEach((valueChain) => {
      const filteredCategories = valueChain.categories
        .filter((category) =>
          category.code_name.includes(searchString)
        );
      if (filteredCategories.length) {
        const newValueChain = { ...valueChain };
        newValueChain.categories = filteredCategories;
        filteredValueChainData.push(newValueChain);
      }
    });
    this.filteredValueChainData = filteredValueChainData;
  }

  onCategorySelected(valueChain, category) {
    this.tabService.addTab({
      name: category.name,
      url: `/db/wheat/value_chain/${valueChain.code_name}/category/${category.code_name}`,
    });
  }

  onEnter() {
    if (this.filteredValueChainData.length
      && this.filteredValueChainData[0].categories.length) {
      const valueChain = this.filteredValueChainData[0];
      const category = valueChain.categories[0];
      this.tabService.addTab({
        name: category.name,
        url: `/db/wheat/value_chain/${valueChain.code_name}/category/${category.code_name}`,
      });
    }
  }
}
