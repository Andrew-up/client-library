import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private userService: UserService,
              private tokenService: TokenStorageService,
              private router: Router) {
  }

  isRouterAllowed(): boolean {
    if (this.tokenService.getUser() != null) {
      // console.log(this.tokenService.getUser())
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isRouterAllowed();
  }

}
