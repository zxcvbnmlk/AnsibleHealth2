import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {AdminComponent} from './admin';
import {LoginComponent} from './login';
import {AuthGuard} from './_helpers';
import {Role} from './_models';
import {RedirectGuard} from "@app/_helpers/redirect.guard";
import {NotFoundComponent} from "@app/not-found";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'user',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  // otherwise redirect to home
  {path: '**',
   component: NotFoundComponent

  }
];

export const appRoutingModule = RouterModule.forRoot(routes);
