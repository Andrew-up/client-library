import { Injectable } from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {ErrorInterceptorService} from "./error-interceptor.service";

const  KEY_TOKEN_HEADER='Authorization'
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private  tokenService:TokenStorageService,
              private  errorInterceptorService: ErrorInterceptorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(req);

    if(!this.errorInterceptorService.isRefreshing){
      // console.log(this.errorInterceptorService.isRefreshing);
      let authRequest = req;
      const token = this.tokenService.getToken();
      if(token!=null){
        authRequest = req.clone({headers:req.headers.set(KEY_TOKEN_HEADER,token)});
      }
      return next.handle(authRequest);
    }else {
      return next.handle( req.clone({headers:req.headers.set(KEY_TOKEN_HEADER,'token')}));
    }
  }
}

export const authInterceptorProviders = [
  {
    provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true
  }
];
