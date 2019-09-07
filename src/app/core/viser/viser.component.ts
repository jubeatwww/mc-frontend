import { Component, Input, ViewChild, ComponentFactoryResolver, Type, OnChanges } from '@angular/core';
import * as DataSet from '@antv/data-set';
import { ViewContainerRefDirective } from '@@shared/directives/view-container-ref.directive';

import { ViserWidgetComponents } from './models/viser-widget';
import { ViserWidgetType } from './components/viser-widget.component';

@Component({
  selector: 'app-viser',
  templateUrl: './viser.component.html',
  styleUrls: ['./viser.component.less']
})
export class ViserComponent implements OnChanges {
  @Input() type: ViserWidgetType = ViserWidgetType.LINE;
  @Input() height = 400;
  @Input() timeInterval = 'year';
  @Input() data;
  @Input() forceFit = true;
  scale = [];
  dataset;

  @ViewChild(ViewContainerRefDirective, {static: true})
  viserContainerRef: ViewContainerRefDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnChanges() {
    this._rawDataToDataset();
    this._parseTimeScale();
    this._loadComponent();
  }

  private _rawDataToDataset() {
    const dv = new DataSet.View().source(this.data);
    const fields = Object.keys(this.data[0]).filter(k => k !== 'time');
    dv.transform({
      type: 'fold',
      fields,
      key: 'key',
      value: 'value',
    });
    this.dataset = dv.rows;
  }

  private _parseTimeScale() {
    const timeList = this.data.map(d => d.time);
    this.scale = [{
      dataKey: 'time',
      min: Math.min(...timeList),
      max: Math.max(...timeList),
      tickCount: timeList.length,
    }];
  }

  private _loadComponent() {
    const GraphComponent: Type<any> = ViserWidgetComponents[this.type || ViserWidgetType.LINE];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GraphComponent);
    const { viewContainerRef } = this.viserContainerRef;
    viewContainerRef.clear();

    const widget = viewContainerRef.createComponent(componentFactory);

    if (this.type === ViserWidgetType.GROUPED_COLUMN
      && Object.keys(this.data[0]).length <= 2) {
      widget.instance.adjust = [];
    }
  }

}
