import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      let url:string = state.url;
      return this.checkLogin(url);
    }
  
  checkLogin(url: string | UrlTree) {
      this.resetDraft(url);
      let val: any = localStorage.getItem('isUserLoggedIn');

      if(val != null && val == "true") {
        if(url == '/login') {
          return this.router.parseUrl('/users');
        }
        else {
          return true;
        };
      }
      else {
        return this.router.parseUrl('/login');
      }
  }

  // to reset local storage data of create and update forms
  resetDraft(url:any) {
    if(url == '/posts' || url == '/users') {
      localStorage.removeItem('oldPostData');
      localStorage.removeItem('oldUserData');
    }
  }
}
