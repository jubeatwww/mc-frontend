import { Component, OnInit, Input } from '@angular/core';
import DataSet from '@antv/data-set';

export enum ViserType {
  LINE = 0,
  GROUPED_COLUMN = 1,
}

@Component({
  selector: 'app-viser',
  templateUrl: './viser.component.html',
  styleUrls: ['./viser.component.less']
})
export class ViserComponent implements OnInit {
  @Input() type: ViserType = ViserType.LINE;
  @Input() height = 400;
  @Input() timeInterval = 'year';
  @Input() data;
  @Input() forceFit = true;
  scale;
  dataset;
  adjust = [{
    type: 'dodge',
    marginRatio: 1 / 32,
  }];

  constructor() { }

  ngOnInit() {
    const dv = new DataSet.View().source(this.data);
    const fields = Object.keys(this.data[0]).filter(k => k !== 'time');
    dv.transform({
      type: 'fold',
      fields,
      key: 'key',
      value: 'value',
    });
    this.dataset = dv.rows;

    const timeList = this.data.map(d => d.time);
    this.scale = [{
      dataKey: 'time',
      min: Math.min(...timeList),
      max: Math.max(...timeList),
    }];
  }

}
