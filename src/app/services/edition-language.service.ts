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


  public createEditionLanguage(edition:EditionLanguage):Observable<any>{
    return this.httpClient.post(EDITION_LANGUAGE_API+'create',edition);
  }

  public getAllEditionLanguage():Observable<EditionLanguage[]>{
    return this.httpClient.get<EditionLanguage[]>(EDITION_LANGUAGE_API+'all');
  }

  public updateEditionLanguage(update:EditionLanguage):Observable<EditionLanguage>{
    return this.httpClient.post(EDITION_LANGUAGE_API+'update',update)
  }

  public deleteEditionLanguage(update?:number):Observable<any>{
    return this.httpClient.post(EDITION_LANGUAGE_API+'delete',update)
  }
}
