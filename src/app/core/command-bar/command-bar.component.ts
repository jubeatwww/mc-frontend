import { Component, OnInit } from '@angular/core';

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

  constructor(private datasetEntryService: DatasetEntryService) { }

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
}
