import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './core/electron/electron.service';

import { WebviewDirective } from './shared/directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DatasetVisComponent } from './components/dataset-vis/dataset-vis.component';
import { LoginComponent } from './components/home/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TabsComponent } from './core/tabs/tabs.component';
import { TabsService } from './core/tabs/tabs.service';
import { CommandBarComponent } from './core/command-bar/command-bar.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    DatasetVisComponent,
    LoginComponent,
    WelcomeComponent,
    TabsComponent,
    CommandBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgZorroAntdModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, TabsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
