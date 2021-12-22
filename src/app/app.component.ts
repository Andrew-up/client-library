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


  constructor(private token:TokenStorageService) {
  }

  logout(){
    this.token.logOut();
  }

  getLoggedInStatus() {
    if (this.token.getToken()!=null) {
      console.log('true')
      return false;
    }
    else {
      console.log('false')
      return true;
    }
  }

}
