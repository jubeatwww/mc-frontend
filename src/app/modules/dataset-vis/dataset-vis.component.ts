import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Dataset from '@antv/data-set';

import { DatasetEntryService } from '@@core/dataset-entry/dataset-entry.service';

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

  constructor(private route: ActivatedRoute, private datasetEntryService: DatasetEntryService) { }

  ngOnInit() {
    const { keys } = this.route.snapshot.paramMap;
    const entry = {};
    keys.forEach((key: string) => {
      entry[key] = this.route.snapshot.paramMap.get(key);
    });

    this.data = this.datasetEntryService.datasets[0].data;
  }

}
