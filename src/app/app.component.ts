import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'client';


  constructor(private token: TokenStorageService) {
  }

  logout() {
    this.token.logOut();
  }

  getLoggedInStatus() {
    if (this.token.getToken() != null) {
      return false;
    } else {
      return true;
    }
  }

  public getLoggerInUser = false;
  public getLoggerInWorker = false;
  public getLoggerInAdmin = false;

  getLoggerInUserRole() {
    if (this.token.getRole() == 'ROLE_USER') {
      this.getLoggerInUser = true;
    }
    if (this.token.getRole() == 'ROLE_WORKER') {
      this.getLoggerInUser = true;
      this.getLoggerInWorker = true;
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

}
