import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, Observable, switchMap, throwError} from "rxjs";
import {TokenStorageService} from "../services/token-storage.service";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {DatePipe} from "@angular/common";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private datePipe: DatePipe
  ) {
  }

  public isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // console.log(this.refreshTokenSubject);
    // console.log(this.isRefreshing);
    console.log(request);
    console.log(next);
    console.log(this.refreshTokenSubject);
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      // console.log('request22');
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, this.tokenService.getToken() + ''));
        }));

    } else {
      // console.log('request');
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));

        }));

    }
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenService.getJwtToken()) {
      request = this.addToken(request, this.tokenService.getJwtToken() + '');
    }
    return next.handle(request).pipe(catchError(error => {

      if (error.status === 403) {
        const dateRefreshToken = this.datePipe.transform(this.tokenService.getRefreshTokenDate(), 'ddMMYYYYHH24mmss ');
        const dateToday = this.datePipe.transform(new Date(), 'ddMMYYYYHH24mmss ')
        if (dateToday && dateRefreshToken != null) {
          if (dateToday > dateRefreshToken) {
            // console.log(dateToday)
            // console.log(dateRefreshToken)
            // this.notificationService.showSnackBar("Выход");
            this.tokenService.logOut();
          }
          if (dateToday < dateRefreshToken) {
            console.log(dateToday)
            console.log(dateRefreshToken)
            this.notificationService.showSnackBar("Нет доступа");
          } else {

          }
        }

      }

      if (error instanceof HttpErrorResponse &&
        error.status === 401 &&
        location.pathname != '/login' &&
        location.pathname != '/register') {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`
      }
    });
  }
}

export const authErrorInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true
  }

];
