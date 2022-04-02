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
  public getAllRentByUser():Observable<RentBook[]>{
    return this.httpClient.get<RentBook[]>(RENT_API+'/myBooksRentAll');
  }
  public getAllRentRequestByUser():Observable<RentBook[]>{
    return this.httpClient.get<RentBook[]>(RENT_API+'/getBooksRentRequestAll');
  }

  public addRent(rent:RentBook, idBasked?:string):Observable<any>{
    return this.httpClient.post(RENT_API+'/create/'+idBasked, rent);
  }

  public deleteRent(idRent):Observable<any>{
    return this.httpClient.get(RENT_API+'/delete/'+idRent);
  }




}
