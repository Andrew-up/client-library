import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookGenres} from "../models/BookGenres";
import {Price} from "../models/Price";
import {CoverCode} from "../models/CoverCode";

const PRICE_API ='http://localhost:8099/api/books/price/'

@Injectable({
  providedIn: 'root'
})
export class PriceRentService {

  constructor(private httpClient:HttpClient) { }

  public getAllPriceRent():Observable<any>{
    return this.httpClient.get(PRICE_API+'all');
  }

  public createPriceRent(priceRent:Price):Observable<any>{
    return this.httpClient.post(PRICE_API+'create',priceRent);
  }

  public deletePriceRent(deletePriceId?:number):Observable<any>{
    return this.httpClient.post(PRICE_API+'delete',deletePriceId)
  }

  public updatePriceRent(update:Price):Observable<Price>{
    return this.httpClient.post(PRICE_API+'update',update)
  }
}
