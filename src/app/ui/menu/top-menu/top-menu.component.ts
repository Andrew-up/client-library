import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(public token: TokenStorageService,
              public userService:UserService,
  ) {
  }

  ngOnInit(): void {
  }

  getLoggedInStatus() {
    return this.token.getToken() == null;
  }
}
