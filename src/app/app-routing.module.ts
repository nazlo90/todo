import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WikiComponent} from './wiki/wiki.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'wiki',
    component: WikiComponent
  },
  {
    path: 'not_found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not_found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
