import {Component, EventEmitter, ViewEncapsulation} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {TokenStorageService} from "./services/token-storage.service";
import {ErrorInterceptorService} from "./helper/error-interceptor.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'client';

  constructor(private token: TokenStorageService,
              private errorInterceptorService: ErrorInterceptorService) {
  }

  logout() {
    this.token.logOut();
  }


  getLoggedInStatus() {
    return this.token.getToken() == null;
  }

  public getLoggerInUser = false;
  public getLoggerInWorker = false;
  public getLoggerInAdmin = false;

  public getLoggerInUserRole() {
    if (this.token.getRole() == 'ROLE_USER') {
      this.getLoggerInUser = true;
      this.getLoggerInWorker = false;
      this.getLoggerInAdmin = false;
    }
    if (this.token.getRole() == 'ROLE_WORKER') {
      this.getLoggerInUser = true;
      this.getLoggerInWorker = true;
      this.getLoggerInAdmin = false;
    }
    if (this.token.getRole() == 'ROLE_ADMIN') {
      this.getLoggerInUser = true;
      this.getLoggerInWorker = true;
      this.getLoggerInAdmin = true;
    }
  }

  test?: string;

  checkStorage(): string {
    this.test = this.token.getRole() + '';
    return this.token.getRole() + '';
  }


  public isVisited = false;

  openSubmenu() {
    this.isVisited = !this.isVisited;
  }


}
