import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../models/Author";

const BASKET_API = 'http://localhost:8099/api/users/basket'

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllBasket(): Observable<any[]> {
    return this.httpClient.get<any[]>(BASKET_API + '/all'
    );
  }
  public getAllBasketByUserId(userId): Observable<any[]> {
    return this.httpClient.get<any[]>(BASKET_API + '/all/'+ userId);
  }

  public cancelRentRequestByUser(userId): Observable<any[]> {
    return this.httpClient.get<any[]>(BASKET_API + '/cancel/'+ userId);
  }

  public getMyBasket(): Observable<any[]> {
    return this.httpClient.get<any[]>(BASKET_API + '');
  }

  public addBasketToUser(book):Observable<any>{
    return this.httpClient.post(BASKET_API+'/addBasketToUser',book);
  }
  public createBookRequest(book):Observable<any>{
    return this.httpClient.post(BASKET_API+'/createBookRequest',book);
  }
  public deleteBasketToUser(idDelete):Observable<any>{
    return this.httpClient.post(BASKET_API+'/delete', idDelete);
  }
}
