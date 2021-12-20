import {Component, OnInit} from '@angular/core';

import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  getTestText?: String;

  userError:{email:string,password:string} = {
    email:'',
    password:''
}

  getUserSignInPost() {
    this.authService.login(this.userData).subscribe(response => this.object(response),error => this.object(error.error));
    // this.authService.login(this.userData).subscribe({
    //   next:()=>{this.userData.email}
    //
    // });
  }
  object(test: any): any {
    this.getTestText = JSON.stringify(test);
  }
  userData: {email: string, password: string } = {
    email: '1',
    password: '1'
  }
  ngOnInit() {
    console.log(Object(this.userData));
    // console.log(this.userData.email);
  }
}
