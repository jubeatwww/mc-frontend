import { NgModule } from '@angular/core';
import { SharedModule } from '@@shared/shared.module';
import { ViserModule } from 'viser-ng';

import { DatasetVisComponent } from './dataset-vis.component';
import { CoreModule } from '@@core/core.module';

@NgModule({
  declarations: [
    DatasetVisComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    ViserModule,
  ],
  exports: [
    DatasetVisComponent
  ]
})
export class DatasetVisModule { }
