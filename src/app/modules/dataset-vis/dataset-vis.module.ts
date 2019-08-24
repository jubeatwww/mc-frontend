import { NgModule } from '@angular/core';
import { SharedModule } from '@@shared/shared.module';

import { DatasetVisComponent } from './dataset-vis.component';
import { SpreadsheetComponent } from './components/spreadsheet/spreadsheet.component';

@NgModule({
  declarations: [
    DatasetVisComponent,
    SpreadsheetComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DatasetVisComponent
  ]
})
export class DatasetVisModule { }
