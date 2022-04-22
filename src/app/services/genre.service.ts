import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookGenres} from "../models/BookGenres";
import {Observable} from "rxjs";
const GENRE_API ='http://localhost:8099/api'

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private  httpClient:HttpClient) { }

  public createGenre(genre:BookGenres):Observable<any>{
    return this.httpClient.post(GENRE_API+'/staff/books/genres/create',genre);
  }

  public getAllGenres():Observable<BookGenres[]>{
    return this.httpClient.get<BookGenres[]>(GENRE_API+'/books/genres/all');
  }

  public updateGenre(update:BookGenres):Observable<BookGenres>{
    return this.httpClient.post(GENRE_API+'/staff/books/genres/update',update)
  }

  public deleteGenre(update?:number):Observable<any>{
    return this.httpClient.post(GENRE_API+'/staff/books/genres/delete',update)
  }
}
