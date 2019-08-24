import { NgModule } from '@angular/core';
import { SharedModule } from '@@shared/shared.module';

import { ElectronService } from './electron/electron.service';
import { TabsService } from './tabs/tabs.service';

import { CommandBarComponent } from './command-bar/command-bar.component';
import { TabsComponent } from './tabs/tabs.component';

const declarations = [
  CommandBarComponent,
  TabsComponent
];

@NgModule({
  declarations,
  imports: [
    SharedModule,
  ],
  providers: [
    ElectronService,
    TabsService,
  ],
  exports: declarations
})
export class CoreModule { }
