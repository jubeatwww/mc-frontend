import { NgModule } from '@angular/core';
import { SharedModule } from '@@shared/shared.module';

import { HomeComponent } from './home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
