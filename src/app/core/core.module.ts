import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ViserModule } from 'viser-ng';
import { SharedModule } from '@@shared/shared.module';


import { ElectronService } from './electron/electron.service';
import { TabsService } from './tabs/tabs.service';
import { DatasetEntryService } from './dataset-entry/dataset-entry.service';

import { CommandBarComponent } from './command-bar/command-bar.component';
import { TabsComponent } from './tabs/tabs.component';
import { ViserComponent } from './viser/viser.component';

import { ViserLineComponent, ViserBarComponent } from './viser/components/viser-widget.component';

const declarations = [
  ViserLineComponent,
  ViserBarComponent,
  CommandBarComponent,
  ViserComponent,
  TabsComponent,
];

const entryComponents = [
  ViserLineComponent,
  ViserBarComponent,
];

@NgModule({
  declarations,
  entryComponents,
  imports: [
    SharedModule,
    ViserModule,
  ],
  providers: [
    ElectronService,
    TabsService,
    DatasetEntryService,
  ],
  exports: declarations
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() core: CoreModule
  ) {
    if (core) {
      throw new Error('You should import core module only in the app module');
    }

  }
}
