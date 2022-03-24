import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, config, defer, delay, filter, Observable, of, tap} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {Token} from "../models/Token";
import {take} from "rxjs/operators";


const AUTH_API = 'http://localhost:8099/api/auth';
const UPDATE_TOKEN_API = 'http://localhost:8099/api/auth/refreshtoken';

export interface RefreshTokenResult {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  public login(user: any): Observable<any> {
    return this.httpClient.post(AUTH_API + '/signin', {
      email: user.email,
      password: user.password
    });
  }

  public register(user: any): Observable<any> {
    return this.httpClient.post(AUTH_API + '/signup', {
      email: user.email,
      name: user.name,
      surname: user.surname,
      password: user.password,
    });
  }

  refreshToken() {
    return this.httpClient.post<any>(UPDATE_TOKEN_API, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Token) => {
      this.storeJwtToken(tokens.accessToken+'');
    }));
  }

  private getRefreshToken() {
    return localStorage.getItem('auth-token-refresh');
  }

  private storeJwtToken(jwt: string) {
    localStorage.removeItem('auth-token');
    localStorage.setItem('auth-token', jwt);
  }
}

