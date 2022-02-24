import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Translation} from "../models/Translation";
import {Observable} from "rxjs";
import {AgeLimit} from "../models/AgeLimit";

const TRANSLATION_API ='http://localhost:8099/api/books/translation/'

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private  httpClient:HttpClient) { }

  public createTranslation(ageLimit:Translation):Observable<any>{
    return this.httpClient.post(TRANSLATION_API+'create',ageLimit);
  }

  public getAllTranslation():Observable<Translation[]>{
    return this.httpClient.get<Translation[]>(TRANSLATION_API+'all');
  }

  public updateTranslation(update:Translation):Observable<Translation>{
    return this.httpClient.post(TRANSLATION_API+'update',update)
  }

  public deleteTranslation(update?:number):Observable<any>{
    return this.httpClient.post(TRANSLATION_API+'delete',update)
  }

}
