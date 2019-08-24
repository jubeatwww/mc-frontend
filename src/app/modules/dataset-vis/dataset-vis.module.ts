import { NgModule } from '@angular/core';
import { SharedModule } from '@@shared/shared.module';

import { DatasetVisComponent } from './dataset-vis.component';

@NgModule({
  declarations: [
    DatasetVisComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DatasetVisComponent
  ]
})
export class DatasetVisModule { }
