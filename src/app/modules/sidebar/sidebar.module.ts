import { NgModule } from '@angular/core';
import { SharedModule } from '@@shared/shared.module';

import { SidebarComponent } from './sidebar.component';
import { SidebarDrawerComponent } from './components/sidebar-drawer/sidebar-drawer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    SidebarDrawerComponent,
    SidebarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
