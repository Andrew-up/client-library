import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../models/Author";

const AUTHORS_API ='http://localhost:8099/api/'
@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient:HttpClient) { }


  public createAuthor(author:Author):Observable<any>{
    return this.httpClient.post(AUTHORS_API+'staff/authors/create',author);
  }
  public getAllAuthor():Observable<any>{
    return this.httpClient.get(AUTHORS_API+'authors/all');
  }
  public searchAuthors(searchInput?:string):Observable<any>{
    return this.httpClient.post(AUTHORS_API+'authors/search',{
      search:searchInput,
    });
  }

}
