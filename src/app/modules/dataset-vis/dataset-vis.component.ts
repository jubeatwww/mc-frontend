import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private datasetEntryService: DatasetEntryService) { }

  ngOnInit() {
    const { keys } = this.route.snapshot.paramMap;
    const entry = {};
    keys.forEach((key: string) => {
      entry[key] = this.route.snapshot.paramMap.get(key);
    });

    this.data = this.datasetEntryService.getDatasetsByCategory(1);

    const { data } = this;
    if (data.length > 0) {
      this.spreadsheets = data.map((dataset) => {
        const spreadsheet = {
            rows: [],
            columns: [],
            data: [],
        };

        Object.keys(dataset.data[0])
            .filter(k => k !== 'time')
            .forEach((k) => {
            spreadsheet.rows.push(k);
            spreadsheet.data.push([]);
        });
        dataset.data.forEach((d) => {
            const { rows } = spreadsheet;
            spreadsheet.columns.push(d.time);
            rows.forEach((r, i) => {
               spreadsheet.data[i].push(d[r]);
            });
        });

        return spreadsheet;
      });
    }
  }

}
