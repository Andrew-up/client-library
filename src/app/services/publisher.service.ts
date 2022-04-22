import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Publisher} from "../models/Publisher";
import {Observable} from "rxjs";

const PUBLISHER_API = 'http://localhost:8099/api'

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private httpClient: HttpClient) {
  }

  public createPublisher(publisher: Publisher): Observable<any> {
    return this.httpClient.post(PUBLISHER_API + '/staff/books/publisher/create', publisher);
  }

  public deletePublisher(update?: number): Observable<any> {
    return this.httpClient.post(PUBLISHER_API + '/staff/books/publisher/delete', update)
  }

  public getAllPublisher(): Observable<Publisher[]> {
    return this.httpClient.get<Publisher[]>(PUBLISHER_API + '/books/publisher/all');
  }

  public updatePublisher(update: Publisher): Observable<Publisher> {
    return this.httpClient.post(PUBLISHER_API + '/staff/books/publisher/update', update)
  }

}
