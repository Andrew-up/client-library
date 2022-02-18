import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AgeLimit} from "../models/AgeLimit";
import {Observable} from "rxjs";
import {BookGenres} from "../models/BookGenres";

const AGE_LIMIT_API ='http://localhost:8099/api/books/age-limit/'

@Injectable({
  providedIn: 'root'
})
export class AgeLimitService {

  constructor(private httpClient:HttpClient) { }

  public createAgeLimit(ageLimit:AgeLimit):Observable<any>{
    return this.httpClient.post(AGE_LIMIT_API+'create',ageLimit);
  }

  public getAllAgeLimit():Observable<AgeLimit[]>{
    return this.httpClient.get<AgeLimit[]>(AGE_LIMIT_API+'all');
  }

  public updateAgeLimit(update:AgeLimit):Observable<AgeLimit>{
    return this.httpClient.post(AGE_LIMIT_API+'update',update)
  }

  public deleteAgeLimit(update?:number):Observable<any>{
    return this.httpClient.post(AGE_LIMIT_API+'delete',update)
  }

}
