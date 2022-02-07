import {Injectable} from '@angular/core';

const KEY_TOKEN = 'auth-token';
const KEY_REFRESH_TOKEN = 'auth-token-refresh';
const KEY_USER = 'auth-user';

const USER_ROLE = 'user-role'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public saveToken(token: string, refresh_token: string): void {
    window.sessionStorage.removeItem(KEY_TOKEN);
    window.sessionStorage.removeItem(KEY_REFRESH_TOKEN);
    window.sessionStorage.setItem(KEY_TOKEN, token);
    window.sessionStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
  }

  public saveRole(role: string): void {
    window.sessionStorage.removeItem(USER_ROLE);
    window.sessionStorage.setItem(USER_ROLE, role);
  }

  public getRole(): string | null {
    return sessionStorage.getItem(USER_ROLE);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(KEY_TOKEN);

  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(KEY_REFRESH_TOKEN);
  }

  public updateToken(): string | null {
    return sessionStorage.getItem(KEY_REFRESH_TOKEN);
  }


  public saveUser(user: any): void {
    window.sessionStorage.removeItem(KEY_USER);
    window.sessionStorage.setItem(KEY_USER, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(<string>sessionStorage.getItem(KEY_USER));
  }

  logOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}


