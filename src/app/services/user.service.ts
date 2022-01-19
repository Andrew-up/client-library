import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";


const USER_API ='http://localhost:8099/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient) {
  }

  getUserById(id:Number): Observable<any>{
    return  this.httpclient.get(USER_API +id);
  }

  getCurrentUser(): Observable<any> {
    return this.httpclient.get(USER_API);
  }

  updateUser(user:any): Observable<any>{
    return this.httpclient.post(USER_API+'update',user);
  }

  public getAllUsers():Observable<User[]>{
   return this.httpclient.get<User[]>(USER_API+'all')
  }
}
