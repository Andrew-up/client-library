import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Token} from "../../models/Token";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  email = 'ivanov10@mail.ru';
  password = 'test123';
  textOrPass ='password';

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private router: Router
  ) {
    if(this.tokenStorageService.getUser()!=null){
      this.router.navigate(['/index'])
    }
  }

  refreshToken?: string = '';
  success?: boolean;
  token?: string = '';
  error?: string = '';
  eRole?: string = '';

  submitForm(form:NgForm){
    let o = {
      email: '',
      password: ''
    }
    o.email = form.value.email;
    o.password = btoa(form.value.password);
    this.authService.login(o).subscribe({
      next: (v: Token) => {
        this.refreshToken = v.refreshToken;
        this.success = v.success;
        this.token = v.accessToken;
        this.eRole = v.role;
        if (v.success) {
          console.log(v.refreshToken);
          console.log(this.refreshToken);
          this.tokenStorageService.saveToken(this.token + '');
          this.tokenStorageService.saveRefreshToken(this.refreshToken + '');
          this.tokenStorageService.saveRole(this.eRole + '');
          this.router.navigate(['/index']).then(() => {
            console.log('test');
            this.notificationService.showSnackBar("Авторизация успешна!");
            window.location.reload();
          });

        }
      },
      error: (e) => {
        this.notificationService.showSnackBar(e.error.email + ' ' + e.error.password);
      },
      complete: () => {
        this.userService.getCurrentUser().subscribe({
          next: (v: User) => {
            this.tokenStorageService.saveUser(v);
            this.tokenStorageService.saveRole(v.role + '');

          }
        })
      }
    });
  }

  defaultEmail ='ivanov10@mail.ru';
  defaultPassword ='test123';

  ngOnInit() {

  }
}
