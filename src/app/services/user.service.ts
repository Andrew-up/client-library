import { Injectable } from '@angular/core';
import {forkJoin, mergeMap, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";


const USER_API ='http://localhost:8099/api';
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
    return  this.httpclient.get(USER_API+'/user/' +id);
  }
  getUserRoles(): Observable<any>{
    return  this.httpclient.get(USER_API+'/user/roles');
  }
  getUsersStatus(): Observable<any>{
    return  this.httpclient.get(USER_API+'/user/status');
  }

  getCurrentUser(): Observable<any> {
    return this.httpclient.get(USER_API+'/user/');
  }

  updateUser(user:User): Observable<User>{
    return this.httpclient.post<User>(USER_API+'/user/update',user);
  }
  updateRoleUserOrStatus(user:User): Observable<User>{
    return this.httpclient.post<User>(USER_API+'/admin/user/update',user);
  }

  public getAllUsers():Observable<User[]>{
   return this.httpclient.get<User[]>(USER_API+'/user/all')
  }

  public getAllUsersRequestCreated():Observable<User[]>{
   return this.httpclient.get<User[]>(USER_API+'/staff/user/allRequestCreatedToUser')
  }
}
