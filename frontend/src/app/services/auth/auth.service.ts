import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthUser: any;
  currentUser: any;

  constructor() {}

  login(email: string, pwd: string, userData: any, remember: any) {
    let user: any;
    let password: any;

    user = _.find(userData, function(element) {
      return element.email === email
    });

    if(user) {
      password = _.result(_.find(userData, function(element) {
        return element.email === user.email;
      }), 'password');
    }

    this.isAuthUser = password === pwd;
    if(this.isAuthUser == true) {
      localStorage.setItem('isUserLoggedIn', 'true');
      localStorage.setItem('loggedinUser', JSON.stringify(user));
    }

    return of(this.isAuthUser).pipe(
      delay(1000),
      tap(val => {
        console.log('User Authentication: ', val);
      })
    );
  }

  resetCredentials() {
    localStorage.removeItem('rememberCurrentUser');
    localStorage.removeItem('currentUser');
    localStorage.setItem('isUserLoggedIn', 'false');
  }

  logout():void {
    localStorage.clear();
    this.resetCredentials();
  }
}
