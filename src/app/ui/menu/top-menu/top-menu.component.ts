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
  userName:string ='';

  ngOnInit(): void {
    if(this.token.getUser()!=null){
      this.userName = this.token.getUser().firstname+ ' '+ this.token.getUser().lastname +'';
    }
  }

  getLoggedInStatus() {
    return this.token.getToken() == null;
  }


}
