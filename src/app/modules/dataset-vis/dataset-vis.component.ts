import { Component, OnInit } from '@angular/core';
import G2 from '@antv/g2/build/g2';
import { SpreadSheet } from './components/spreadsheet/spreadsheet.types';

@Component({
  selector: 'app-dataset-vis',
  templateUrl: './dataset-vis.component.html',
  styleUrls: ['./dataset-vis.component.less']
})
export class DatasetVisComponent implements OnInit {
  spreadsheet: SpreadSheet = {
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    rows: [1, 2, 3, 4, 5, 6],
    data: [
      [3, 7, 3, 8, 3, 6, 3],
      [],
      [],
      [],
      [7, 4, 8, 3, 3, 8, 4],
      []
    ]
  }

  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };
  title = 'app';
  data = {};
  chart;
  graph;
  constructor() { }
  chartData() {
    this.data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];
    this.chart = new G2.Chart({
      container: 'g2_c1', // 指定图表容器 ID
      width: 600, // 指定图表宽度
      height: 300 // 指定图表高度
    });

    this.chart.source(this.data);
    this.chart.interval().position('genre*sold').color('genre');
    //  渲染图表
    this.chart.render();
  }
  ngOnInit() {
    this.chartData();
  }

}
