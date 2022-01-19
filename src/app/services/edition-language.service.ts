import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Translation} from "../models/Translation";
import {Observable} from "rxjs";
import {EditionLanguage} from "../models/EditionLanguage";

const EDITION_LANGUAGE_API ='http://localhost:8099/api/books/edition-language/'

@Injectable({
  providedIn: 'root'
})
export class EditionLanguageService {

  constructor(private  httpClient:HttpClient) { }


  public editionLanguageCreate(edition:EditionLanguage):Observable<any>{
    return this.httpClient.post(EDITION_LANGUAGE_API+'create',edition);
  }
}
