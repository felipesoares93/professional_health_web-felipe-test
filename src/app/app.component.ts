import { Component } from '@angular/core';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isLoggedIn: boolean;

  constructor(protected userService: UserService) {
    this.isLoggedIn = userService.isLoggedIn;

    userService.loginStateChange.subscribe((loginState: boolean) => {
      this.isLoggedIn = loginState;
    })
  }
}
