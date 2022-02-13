import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {Token} from "../models/Token";


const AUTH_API = 'http://localhost:8099/api/auth';
const UPDATE_TOKEN_API = 'http://localhost:8099/api/auth/refreshtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient,private tokenStorageService:TokenStorageService) {
  }

  public login(user:any):Observable<any>{
    return this.httpClient.post(AUTH_API+'/signin',{
      email: user.email,
      password: user.password
    });
  }

  public register(user:any):Observable<any>{
    return this.httpClient.post(AUTH_API+'/signup',{
      email: user.email,
      name: user.name,
      surname: user.surname,
      password: user.password,
    });
  }

  public updateJwtToken():Observable<Token>{
   // console.log(this.tokenStorageService.getRefreshToken());
    return this.httpClient.post(UPDATE_TOKEN_API,{
      refreshToken: this.tokenStorageService.getRefreshToken()
    })
  }



}

