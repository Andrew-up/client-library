import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../models/Author";
import {Basket} from "../models/Basket";

const BASKET_API = 'http://localhost:8099/api'

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllBasket(): Observable<any[]> {
    return this.httpClient.get<any[]>(BASKET_API + '/users/basket/all'
    );
  }
  public getAllBasketByUserId(userId): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>(BASKET_API + '/users/basket/all/'+ userId);
  }
  public getBasketByBookId(bookId): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>(BASKET_API + '/users/basket/'+bookId);
  }

  public cancelRentRequestByUser(userId): Observable<any[]> {
    return this.httpClient.get<any[]>(BASKET_API + '/users/basket/cancel/'+ userId);
  }

  public getMyBasket(): Observable<any[]> {
    return this.httpClient.get<any[]>(BASKET_API + '/users/basket');
  }

  public addBasketToUser(book):Observable<any>{
    return this.httpClient.post(BASKET_API+'/users/basket/addBasketToUser',book);
  }
  public createBookRequest(book):Observable<any>{
    return this.httpClient.post(BASKET_API+'/users/basket/createBookRequest',book);
  }
  public deleteBasketToUser(idDelete):Observable<any>{
    return this.httpClient.post(BASKET_API+'/users/basket/delete', idDelete);
  }
}
