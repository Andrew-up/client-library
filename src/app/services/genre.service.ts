import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookGenres} from "../models/BookGenres";
import {Observable} from "rxjs";
const GENRE_API ='http://localhost:8099/api/books/genres/'

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private  httpClient:HttpClient) { }

  public createGenre(genre:BookGenres):Observable<any>{
    return this.httpClient.post(GENRE_API+'create',genre);
  }
}
