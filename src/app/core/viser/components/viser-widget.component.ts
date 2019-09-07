import { Component, OnInit, Input } from '@angular/core';

export enum ViserWidgetType {
  LINE = 0,
  GROUPED_COLUMN = 1,
}

@Component({
  selector: 'app-viser-line',
  template: `
    <ng-container>
      <v-line position="time*value" color="key"></v-line>
      <v-point position="time*value" color="key" [size]="4" shape="circle"></v-point>
    </ng-container>
  `,
})
export class ViserLineComponent {
  type: ViserWidgetType = ViserWidgetType.LINE;
}

@Component({
  selector: 'app-viser-line',
  template: `
    <v-bar position="time*value" color="key" [adjust]="adjust"></v-bar>
  `,
})
export class ViserBarComponent {
  type: ViserWidgetType = ViserWidgetType.GROUPED_COLUMN;
  @Input() adjust = [{
    type: 'dodge',
    marginRatio: 1 / 32,
  }];
}
