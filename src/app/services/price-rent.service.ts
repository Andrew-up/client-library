import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookGenres} from "../models/BookGenres";
import {Price} from "../models/Price";
import {CoverCode} from "../models/CoverCode";

const PRICE_API ='http://localhost:8099/api'

@Injectable({
  providedIn: 'root'
})
export class PriceRentService {

  constructor(private httpClient:HttpClient) { }

  public getAllPriceRent():Observable<Price[]>{
    return this.httpClient.get<Price[]>(PRICE_API+'/books/price/all');
  }

  public createPriceRent(priceRent:Price):Observable<any>{
    return this.httpClient.post(PRICE_API+'/staff/books/price/create',priceRent);
  }

  public deletePriceRent(deletePriceId?:number):Observable<any>{
    return this.httpClient.post(PRICE_API+'/staff/books/price/delete',deletePriceId)
  }

  public updatePriceRent(update:Price):Observable<Price>{
    return this.httpClient.post(PRICE_API+'/staff/books/price/update',update)
  }
}
