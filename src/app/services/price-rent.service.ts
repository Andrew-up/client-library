import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookGenres} from "../models/BookGenres";
import {Price} from "../models/Price";

const PRICE_API ='http://localhost:8099/api/books/price'

@Injectable({
  providedIn: 'root'
})
export class PriceRentService {

  constructor(private httpClient:HttpClient) { }

  public getAllPrice():Observable<any>{
    return this.httpClient.get(PRICE_API+'/all');
  }

  public createPrice(price:Price):Observable<any>{
    return this.httpClient.post(PRICE_API+'/create',price);
  }
}
