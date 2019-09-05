import * as ViserWidgets from '../components/viser-widget.component';

export enum ViserWidgetType {
  LINE = 0,
  GROUPED_COLUMN = 1,
}

export const ViserWidgetComponent = {
  [ViserWidgetType.LINE]: ViserWidgets.ViserLineComponent,
  [ViserWidgetType.GROUPED_COLUMN]: ViserWidgets.ViserBarComponent,
};
