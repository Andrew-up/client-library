import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/Book";

const BOOKS_API = 'http://localhost:8099/api/books/';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(BOOKS_API + 'all');
  }

}
