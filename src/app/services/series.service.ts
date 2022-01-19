import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Series} from "../models/Series";
import {Observable} from "rxjs";

const SERIES_API ='http://localhost:8099/api/books/series/'

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private  httpClient:HttpClient) { }
  public createSeries(series:Series):Observable<any>{
    return this.httpClient.post(SERIES_API+'create',series);
  }

}
