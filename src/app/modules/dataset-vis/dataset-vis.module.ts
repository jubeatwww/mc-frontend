import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from '@@shared/shared.module';

import { DatasetVisComponent } from './dataset-vis.component';
import { SpreadsheetComponent } from './components/spreadsheet/spreadsheet.component';

@NgModule({
  declarations: [
    DatasetVisComponent,
    SpreadsheetComponent
  ],
  imports: [
    SharedModule,
    ScrollingModule
  ],
  exports: [
    DatasetVisComponent
  ]
})
export class DatasetVisModule { }
