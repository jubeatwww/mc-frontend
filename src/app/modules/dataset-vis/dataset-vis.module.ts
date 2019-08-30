import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from '@@shared/shared.module';
import { ViserModule } from 'viser-ng';

import { DatasetVisComponent } from './dataset-vis.component';
import { CoreModule } from '@@core/core.module';
import { SpreadsheetComponent } from './components/spreadsheet/spreadsheet.component';

@NgModule({
  declarations: [
    DatasetVisComponent,
    SpreadsheetComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    ViserModule,
    ScrollingModule,
  ],
  exports: [
    DatasetVisComponent
  ]
})
export class DatasetVisModule { }
