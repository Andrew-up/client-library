import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {Router} from "@angular/router";

const KEY_TOKEN = 'auth-token';
const KEY_REFRESH_TOKEN = 'auth-token-refresh';
const KEY_USER = 'auth-user';

const USER_ROLE = 'user-role'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router:Router) {
  }

  public saveToken(token: string, refresh_token: string): void {
    // window.sessionStorage.removeItem(KEY_TOKEN);
    // window.sessionStorage.removeItem(KEY_REFRESH_TOKEN);
    // window.sessionStorage.setItem(KEY_TOKEN, token);
    // window.sessionStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
    window.localStorage.removeItem(KEY_TOKEN);
    window.localStorage.removeItem(KEY_REFRESH_TOKEN);
    window.localStorage.setItem(KEY_TOKEN, token);
    window.localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
  }

  public saveRole(role: string): void {
    // window.sessionStorage.removeItem(USER_ROLE);
    // window.sessionStorage.setItem(USER_ROLE, role);
    window.localStorage.removeItem(USER_ROLE);
    window.localStorage.setItem(USER_ROLE, role);
  }

  public getRole(): string | null {
    return localStorage.getItem(USER_ROLE);
  }

  public getToken(): string | null {
    return localStorage.getItem(KEY_TOKEN);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(KEY_REFRESH_TOKEN);
  }

  public updateToken(): string | null {
    return localStorage.getItem(KEY_REFRESH_TOKEN);
  }


  public saveUser(user: any): void {
    window.localStorage.removeItem(KEY_USER);
    window.localStorage.setItem(KEY_USER, JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(<string>localStorage.getItem(KEY_USER));
  }

  logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/index']);
  }


}


