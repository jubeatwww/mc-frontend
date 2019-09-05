import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { from } from 'rxjs';
import { take, tap, mergeMap, map } from 'rxjs/operators';

import { DatasetEntryService } from '@@core/dataset-entry/dataset-entry.service';
import { mockSpreadSheet } from './mocks/spreadsheet.mock';

@Component({
  selector: 'app-dataset-vis',
  templateUrl: './dataset-vis.component.html',
  styleUrls: ['./dataset-vis.component.less']
})
export class DatasetVisComponent implements OnInit {
  @Input() title = 'Title';
  data;
  scale;
  forceFit = true;
  height = 400;
  style = { stroke: '#fff', lineWidth: 1 };
  spreadsheets = [];

  public category: string;
  public valueChain: string;
  public crop: string;

  public datasets = [];

  constructor(private route: ActivatedRoute, private datasetEntryService: DatasetEntryService) { }

  dataset$ = (datasets) => {
    return from(datasets)
      .pipe(
        take(Math.round(Math.random() * 3) + 3),
        mergeMap(dataset => this.datasetEntryService.getDataset(dataset)),
      );
  }

  private _dataUpdate() {
    this.datasetEntryService.getCategory(this.category)
    .subscribe((category: any) => {
      this.title = category.name;
      this.dataset$(category.datasets)
        .subscribe((dataset: any) => {
          const viserData = [];
          const spreadsheet = {
            rows: ['Area', 'Value', 'Unit', 'Flag'],
            columns: [],
            data: [[], [], [], []],
          };
          dataset.filter(d => d.area.name === dataset[0].area.name).forEach((d) => {
            spreadsheet.columns.push(d.time.slice(0, 4));
            spreadsheet.data[0].push(d.area.name);
            spreadsheet.data[1].push(d.value);
            spreadsheet.data[2].push(d.unit.name);
            spreadsheet.data[3].push(d.flag.name);

            viserData.push({ time: parseInt(d.time.slice(0, 4), 10), value: d.value });
          });
          this.spreadsheets.push(spreadsheet);
          this.datasets.push(viserData);
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.crop = params.db;
      this.category = params.category;
      this.valueChain = params.valueChain;

      this.datasets = [];
      this.spreadsheets = [];

      this._dataUpdate();
    });
  }

}
