import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Series} from "../models/Series";
import {Observable} from "rxjs";
import {Publisher} from "../models/Publisher";

const SERIES_API ='http://localhost:8099/api/books/series/'

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private  httpClient:HttpClient) { }

  public createSeries(series:Series):Observable<Series>{
    return this.httpClient.post(SERIES_API+'create',series);
  }
  public deleteSeries(update?: number): Observable<any> {
    return this.httpClient.post(SERIES_API + 'delete', update)
  }

  public getAllSeries(): Observable<any[]> {
    return this.httpClient.get<any[]>(SERIES_API + 'all');
  }

  public updateSeries(update: Series): Observable<Series> {
    return this.httpClient.post(SERIES_API + 'update', update)
  }

  public getAllAuthorsBySeriesId(idAuthors:number): Observable<any[]> {
    return this.httpClient.get<any[]>(SERIES_API +'authors/'+ idAuthors);
  }

}
