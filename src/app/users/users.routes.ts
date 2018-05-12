import { Route } from '@angular/router';
import { UsersComponent } from './users.component';

import { AuthGuard } from '../shared/auth-guard.service';

export const UsersRoutes: Route[] = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  }
];
