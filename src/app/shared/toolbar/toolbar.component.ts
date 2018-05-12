import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(protected userService: UserService) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.userService.logOut();
  }

}
