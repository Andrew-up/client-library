import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Translation} from "../models/Translation";
import {Observable} from "rxjs";

const TRANSLATION_API ='http://localhost:8099/api/books/translation/'

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private  httpClient:HttpClient) { }

  public translationCreate(translation:Translation):Observable<any>{
    return this.httpClient.post(TRANSLATION_API+'create',translation);
  }
}
