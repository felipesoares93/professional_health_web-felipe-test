import { Routes } from '@angular/router';

import { LoginRoutes } from './login/login.routes';
import { UsersRoutes } from './users/users.routes';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      ...LoginRoutes,
      ...UsersRoutes,
    ]
  }
];
