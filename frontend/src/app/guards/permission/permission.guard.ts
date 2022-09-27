import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url = state.url;
    return this.checkUserRole(url);
  }
  
  checkUserRole(url: string | UrlTree) {
    let data:any = localStorage.getItem('loggedinUser');
    let currentUser = JSON.parse(data);

    if(currentUser.type == '1') {
      return this.router.parseUrl('/users/permission-denied');
    }
    return true;
  }
}
