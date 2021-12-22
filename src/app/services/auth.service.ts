import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {observable, Observable} from "rxjs";


const AUTH_API = 'http://localhost:8099/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) {
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


}

