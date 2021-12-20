import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";

class objSignIn {
  refreshToken?: '';
  success?: '';
  token?: '';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  public email = 'ivanov11@mail.ru';
  public password = 'test123';

  constructor(private authService: AuthService,
              private notificationService: NotificationService) {
  }

  refreshToken?: String = '';
  success?: String = '';
  token?: String = '';
  next?: String = '';
  error?: String = '';

  apiAuth(login: string, password: string): any {
    let o = {
      email: '',
      password: ''
    }
    o.email = login;
    o.password = password;

    this.authService.login(o).subscribe({
      next: (v: objSignIn) => {
        this.pressTestShowBar();
        this.refreshToken = v.refreshToken;
        this.success = v.success;
        this.token = v.token;
        console.log(v);
        console.log(this.refreshToken);
        console.log(this.success);
        console.log(this.token);
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

  pressTestShowBar(message?: String) {
    this.notificationService.showSnackBar('' + message
    );
  }

  ngOnInit() {
    // console.log('getUserSignInPost ', this.getUserSignInPost().next());
  }
}
