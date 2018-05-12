import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onLoginClick() {
    this.userService.logIn(this.username, this.password, () => {
      // success
      this.resetForm();
    },
    () => {
      // error
    });
  }

  private resetForm() {
    this.username = '';
    this.password = '';
  }
}
