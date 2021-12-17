import {Component, OnInit} from '@angular/core';

import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email?: 'string';
  password?: 'string';

  constructor(private authService: AuthService) {
  }

  getTestText?: String;

  getUserSignInPost() {
    this.authService.login(this.userData).subscribe(response => this.object(response),error => this.object(error));
  }
  object(test: any): any {
    this.getTestText = JSON.stringify(test);
  }
  userData: {email: string, password: string } = {
    email: 'ivanov10@mail.ru',
    password: 'test123'
  }
  ngOnInit() {
    console.log(Object(this.userData));
    // console.log(this.userData.email);
  }
}
