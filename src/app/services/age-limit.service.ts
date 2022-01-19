import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AgeLimit} from "../models/AgeLimit";
import {Observable} from "rxjs";

const AGE_LIMIT_API ='http://localhost:8099/api/books/age-limit/'

@Injectable({
  providedIn: 'root'
})
export class AgeLimitService {

  constructor(private httpClient:HttpClient) { }

  public createAgeLimit(ageLimit:AgeLimit):Observable<any>{
    return this.httpClient.post(AGE_LIMIT_API+'create',ageLimit);
  }

}
