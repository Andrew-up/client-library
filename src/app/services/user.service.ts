import { Injectable } from '@angular/core';
import {forkJoin, mergeMap, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";


const USER_API ='http://localhost:8099/api/user/';
const USER_ROLE_ADMIN ='ROLE_ADMIN';
const USER_ROLE_WORKER ='ROLE_WORKER';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getRoleAdmin():string{
    return USER_ROLE_ADMIN;
  }
  getRoleWorker():string{
    return USER_ROLE_WORKER;
  }
  constructor(private httpclient:HttpClient) {
  }

  getUserById(id:Number): Observable<any>{
    return  this.httpclient.get(USER_API +id);
  }

  getCurrentUser(): Observable<any> {
    return this.httpclient.get(USER_API);
  }

  getUserBool(): Observable<any>{
    return this.httpclient.get(USER_API);
  }

  updateUser(user:User): Observable<User>{
    return this.httpclient.post<User>(USER_API+'update',user);
  }

  public getAllUsers():Observable<User[]>{
   return this.httpclient.get<User[]>(USER_API+'all')
  }
  public getAllUsersRequestCreated():Observable<User[]>{
   return this.httpclient.get<User[]>(USER_API+'allRequestCreatedToUser')
  }
}
