import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ElectronService } from '@@core/electron/electron.service';
import { AppConfig } from '../environments/environment';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  pathParam: Observable<string>;
  router: string;
  title = 'app';
  constructor(public electronService: ElectronService,
    private translate: TranslateService, private _router: Router) {
    this.router = _router.url;
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
  selectedIndex = 0;
  isHomeRoute() {
    return !this._router.isActive('/', true);
  }
  /* tslint:disable-next-line:no-any */
  log(args: any[]): void {
    console.log(args);
  }
  ngOnInit(): void {}
}
