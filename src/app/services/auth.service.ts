import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const AUTH_API = 'http://localhost:8099/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) {
  }

  public get(): Observable<any>{
    return this.httpClient.get('http://localhost:8099/api/books/all');
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
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }
}

