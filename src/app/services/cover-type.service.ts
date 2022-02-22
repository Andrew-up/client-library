import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoverCode} from "../models/CoverCode";
import {Observable} from "rxjs";
import {AgeLimit} from "../models/AgeLimit";

const COVER_TYPE_API ='http://localhost:8099/api/books/cover-code/'

@Injectable({
  providedIn: 'root'
})
export class CoverTypeService {

  constructor(private httpClient:HttpClient) { }

  public createCoverType(coverType:CoverCode):Observable<any>{
    return this.httpClient.post(COVER_TYPE_API+'create',coverType);
  }

  public deleteCoverType(update?:number):Observable<any>{
    return this.httpClient.post(COVER_TYPE_API+'delete',update)
  }
  public getAllCoverType():Observable<CoverCode[]>{
    return this.httpClient.get<CoverCode[]>(COVER_TYPE_API+'all');
  }

  public updateCoverType(update:CoverCode):Observable<CoverCode>{
    return this.httpClient.post(COVER_TYPE_API+'update',update)
  }
}
