import { Injectable } from '@angular/core';
import {
  // ActivatedRouteSnapshot,
  CanActivate,
  Router,
  // RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

export interface AuthInfo {
  userId: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private routerService: Router,
    private localStorageService: LocalstorageService
  ) {}
  canActivate(): // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot

    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.localStorageService.getToken();
    if (token) {
      const decoded: AuthInfo = JSON.parse(atob(token.split('.')[1]));
      console.log(decoded.userId);
      if (decoded.isAdmin && !this._isTokenExpired(decoded.exp)) {
        return true;
      }
    }
    this.routerService.navigateByUrl('/login');
    return false;
  }
  private _isTokenExpired(exp: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= exp;
  }
}
