import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Token} from "../../models/Token";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  email = 'ivanov10@mail.ru';
  password = 'test123';


  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private router: Router) {
    // if (this.tokenStorageService.getUser()) {
    //   this.router.navigate(['/']);
    // }
  }


  refreshToken?: string = '';
  success?: boolean;
  token?: string = '';
  error?: string = '';
  eRole?: string = '';


  apiAuth(login: string, password: string): any {

    let o = {
      email: '',
      password: ''
    }
    o.email = login;
    o.password = password;

    this.authService.login(o).subscribe({
      next: (v: Token) => {
        this.pressTestShowBar();
        this.refreshToken = v.refreshToken;
        this.success = v.success;
        this.token = v.accessToken;
        this.eRole = v.role;
        if (v.success) {
          this.tokenStorageService.saveToken(this.token + '', v.refreshToken + '');
          this.tokenStorageService.saveUser(v);
          this.tokenStorageService.saveRole(this.eRole + '');
          this.pressTestShowBar('Успешно!');
          // window.location.reload();
        }

      },
      error: (e) => {
        this.pressTestShowBar(
          JSON.stringify(e.error));
        console.log(e);
        this.error = e.error
      },
      complete: () => console.info('complete')
    });
  }

  saveRole() {
    this.userService.getCurrentUser().subscribe({
      next: (v: User) => {
        this.tokenStorageService.saveRole(v.role+'');
        console.log(v.role);
      }
    });
  }

  pressTestShowBar(message?: String) {
    this.notificationService.showSnackBar('' + message);
  }

  checkToken() {
    this.token = this.tokenStorageService.getToken() + '';
    this.refreshToken = this.tokenStorageService.getRefreshToken() + '';
    // console.log('getCurrentUser: '+this.tokenStorageService.getUser());
    console.log('getCurrentUser: ' + this.userService.getCurrentUser().subscribe({
      next: (v: User) => {
        console.log('id: ' + v.id);
        console.log('email: ' + v.username);
        console.log('firstname: ' + v.firstname);
        console.log('lastname: ' + v.lastname);
      }
    }));
    // this.userService.getCurrentUser().subscribe();
  }

  getUser() {
    this.authService
  }

  ngOnInit() {
  }
}
