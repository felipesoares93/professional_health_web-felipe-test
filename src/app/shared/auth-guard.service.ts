import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { UserService } from './user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(protected router: Router, protected userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === '/login' && this.userService.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }

    if (state.url !== '/login' && !this.userService.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}