import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { WebviewDirective } from './directives/webview.directive';

const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgZorroAntdModule,
];

const declarations = [
  WebviewDirective
];

@NgModule({
  imports,
  declarations,
  exports: [
    ...imports,
    ...declarations
  ]
})
export class SharedModule { }
