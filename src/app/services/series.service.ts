import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Series} from "../models/Series";
import {Observable} from "rxjs";
import {Publisher} from "../models/Publisher";

const SERIES_API ='http://localhost:8099/api'

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private  httpClient:HttpClient) { }

  public createSeries(series:Series):Observable<Series>{
    return this.httpClient.post(SERIES_API+'/staff/books/series/create',series);
  }
  public deleteSeries(update?: number): Observable<any> {
    return this.httpClient.post(SERIES_API + '/staff/books/series/delete', update)
  }

  public getAllSeries(): Observable<any[]> {
    return this.httpClient.get<any[]>(SERIES_API + '/books/series/all');
  }

  public updateSeries(update: Series): Observable<Series> {
    return this.httpClient.post(SERIES_API + '/staff/books/series/update', update)
  }

  public getAllAuthorsBySeriesId(idAuthors:number): Observable<any[]> {
    return this.httpClient.get<any[]>(SERIES_API +'/books/series/authors/'+ idAuthors);
  }

}
