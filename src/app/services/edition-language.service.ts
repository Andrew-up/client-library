import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Translation} from "../models/Translation";
import {Observable} from "rxjs";
import {EditionLanguage} from "../models/EditionLanguage";

const EDITION_LANGUAGE_API ='http://localhost:8099/api/'

@Injectable({
  providedIn: 'root'
})
export class EditionLanguageService {

  constructor(private  httpClient:HttpClient) { }


  public createEditionLanguage(edition:EditionLanguage):Observable<any>{
    return this.httpClient.post(EDITION_LANGUAGE_API+'staff/books/edition-language/create',edition);
  }

  public getAllEditionLanguage():Observable<EditionLanguage[]>{
    return this.httpClient.get<EditionLanguage[]>(EDITION_LANGUAGE_API+'books/edition-language/all');
  }

  public updateEditionLanguage(update:EditionLanguage):Observable<EditionLanguage>{
    return this.httpClient.post(EDITION_LANGUAGE_API+'staff/books/edition-language/update',update)
  }

  public deleteEditionLanguage(update?:number):Observable<any>{
    return this.httpClient.post(EDITION_LANGUAGE_API+'staff/books/edition-language/delete',update)
  }
}
