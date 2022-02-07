import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {TokenStorageService} from "../services/token-storage.service";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {Token} from "../models/Token";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status == 401 && this.tokenService.getToken() != null) {
        this.authService.updateJwtToken().subscribe({
          next: (v: Token) => {
            this.tokenService.saveToken(v.accessToken + '', v.refreshToken + '');
            // console.log(this.tokenService.getRefreshToken())
            // console.log(v.refreshToken)
            // console.log(v.accessToken)
          }
        });
      }
      if (err.status == 403) {
        this.tokenService.logOut();
        window.location.reload();
      }
      let oError: {
        email?: string
        password?: string;
      }
      oError = err.error
      // const error = JSON.stringify(err.error);
      this.notificationService.showSnackBar(oError.email + '  ' + oError.password);
      return throwError(oError);
    }));
  }
}

export const authErrorInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true
  }

];
