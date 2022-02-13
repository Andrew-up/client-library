import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Publisher} from "../models/Publisher";
import {Observable} from "rxjs";

const PUBLISHER_API ='http://localhost:8099/api/books/publisher/'

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private  httpClient:HttpClient) { }

  public createPublisher(publisher:Publisher):Observable<any>{
    return this.httpClient.post(PUBLISHER_API+'create',publisher);
  }
}
