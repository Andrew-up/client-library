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
import {RefreshToken} from "../../models/RefreshToken";

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

  refreshToken!: RefreshToken;
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
        this.refreshToken = v.refreshToken!;
        this.success = v.success;
        this.token = v.accessToken;
        this.eRole = v.role;
        if (v.success) {
          console.log(v.refreshToken);
          console.log(this.refreshToken);
          this.tokenStorageService.saveToken(this.token + '');
          this.tokenStorageService.saveRefreshToken(this.refreshToken);
          this.tokenStorageService.saveRole(this.eRole + '');
        }
        if(!v.success){
          this.notificationService.showSnackBar(v.accessToken+'');
        }
      },
      error: (e) => {
        if (e.error.email=='Invalid username'){
          this.notificationService.showSnackBar('Неверный логин или пароль');
        }
      },
      complete: () => {
        this.userService.getCurrentUser().subscribe({
          next: (v: User) => {
            this.tokenStorageService.saveUser(v);
            this.tokenStorageService.saveRole(v.role + '');
          },
          complete:()=>{
            this.router.navigate(['/index']).then(() => {
              console.log('test');
              this.notificationService.showSnackBar("Авторизация успешна!");
              window.location.reload();
            });
          }
        })
      }
    });
  }

  defaultEmail ='';
  defaultPassword ='';

  ngOnInit() {

  }
}
