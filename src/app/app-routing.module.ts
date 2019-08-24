import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@@modules/home/home.component';
import { WelcomeComponent } from '@@modules/welcome/welcome.component';
import { DatasetVisComponent } from '@@modules/dataset-vis/dataset-vis.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'db',
        component: DatasetVisComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
