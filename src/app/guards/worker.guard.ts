import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class WorkerGuard implements CanActivate {

  constructor(private userService: UserService,
              private tokenService: TokenStorageService,
              private router: Router) {
  }

  isRouterWorker(): boolean {
    if (this.tokenService.getUser() != null) {
      console.log(this.tokenService.getUser().role);
      if (this.tokenService.getUser().role == 'ROLE_ADMIN' ||
          this.tokenService.getUser().role == 'ROLE_WORKER'){
        return true;
      }
      else {
        this.router.navigate(['/404']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isRouterWorker();
  }

}
