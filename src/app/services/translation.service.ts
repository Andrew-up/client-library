import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Translation} from "../models/Translation";
import {Observable} from "rxjs";
import {AgeLimit} from "../models/AgeLimit";

const TRANSLATION_API ='http://localhost:8099/api'

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private  httpClient:HttpClient) { }

  public createTranslation(ageLimit:Translation):Observable<any>{
    return this.httpClient.post(TRANSLATION_API+'/staff/books/translation/create',ageLimit);
  }

  public getAllTranslation():Observable<Translation[]>{
    return this.httpClient.get<Translation[]>(TRANSLATION_API+'/books/translation/all');
  }

  public updateTranslation(update:Translation):Observable<Translation>{
    return this.httpClient.post(TRANSLATION_API+'/staff/books/translation/update',update)
  }

  public deleteTranslation(update?:number):Observable<any>{
    return this.httpClient.post(TRANSLATION_API+'/staff/books/translation/delete',update)
  }

}
