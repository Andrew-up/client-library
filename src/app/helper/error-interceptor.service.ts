import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {TokenStorageService} from "../services/token-storage.service";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {Token} from "../models/Token";
import {User} from "../models/User";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private userService: UserService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status == 401 &&
          this.tokenService.getToken() != null &&
          this.tokenService.getRefreshToken() != null &&
          this.tokenService.getUser() != null &&
          this.tokenService.getRole() != null) {
        this.authService.updateJwtToken().subscribe({
          next: (v: Token) => {
            this.tokenService.saveToken(v.accessToken + '', v.refreshToken + '');
          }
        });
      }
      // console.log(this.tokenService.getRefreshToken());
      // console.log(this.tokenService.getUser());
      // console.log(this.tokenService.getRole());
      // console.log(this.tokenService.getToken());
      // if (err.status == 401 &&
      //   this.tokenService.getRefreshToken() != null &&
      //   this.tokenService.getToken() != null &&
      //   this.tokenService.getUser() != null &&
      //   this.tokenService.getRole() != null) {
      //   // window.location.reload();
      // }
      if (err.status == 403) {
        this.tokenService.logOut();
        window.location.reload();
      }

      // const error = JSON.stringify(err.error);
      // this.notificationService.showSnackBar(err);
      return throwError(err);
    }));

  }
}

export const authErrorInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true
  }

];
