import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from '@@shared/shared.module';
import { CoreModule } from '@@core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from '@@modules/home/home.module';
import { WelcomeModule } from '@@modules/welcome/welcome.module';
import { DatasetVisModule } from '@@modules/dataset-vis/dataset-vis.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    HomeModule,
    WelcomeModule,
    DatasetVisModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
