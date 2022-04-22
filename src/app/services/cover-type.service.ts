import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoverCode} from "../models/CoverCode";
import {Observable} from "rxjs";
import {AgeLimit} from "../models/AgeLimit";

const COVER_TYPE_API ='http://localhost:8099/api'

@Injectable({
  providedIn: 'root'
})
export class CoverTypeService {

  constructor(private httpClient:HttpClient) { }

  public createCoverType(coverType:CoverCode):Observable<any>{
    return this.httpClient.post(COVER_TYPE_API+'/staff/books/cover-code/create',coverType);
  }

  public deleteCoverType(update?:number):Observable<any>{
    return this.httpClient.post(COVER_TYPE_API+'/staff/books/cover-code/delete',update)
  }
  public getAllCoverType():Observable<CoverCode[]>{
    return this.httpClient.get<CoverCode[]>(COVER_TYPE_API+'/books/cover-code/all');
  }

  public updateCoverType(update:CoverCode):Observable<CoverCode>{
    return this.httpClient.post(COVER_TYPE_API+'/staff/books/cover-code/update',update)
  }
}
