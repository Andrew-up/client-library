import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RentBook} from "../models/RentBook";

const RENT_API ='http://localhost:8099/api/books/rent'

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private httpClient:HttpClient) { }

  public getAllRent():Observable<RentBook[]>{
    return this.httpClient.get<RentBook[]>(RENT_API+'/all');
  }

  public addRent(rent:RentBook):Observable<any>{
    return this.httpClient.post(RENT_API+'/create',rent);
  }

}
