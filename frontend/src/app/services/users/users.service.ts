import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/app/interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userAPI = environment.apiURL + '/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers() {
    return this.http.get(this.userAPI, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  createUser(data: User): Observable<User> {
    return this.http.post<User>(this.userAPI, data, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.userAPI + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(data: User):Observable<User> {
    const body = JSON.stringify(data);
    return this.http.patch<User>(this.userAPI + '/' + data.id, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.userAPI + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error("A client side error occurs. The error message is " + error.message);
    }
    else {
      console.error("An error happened in server. The HTTP status code is "  + error.status + " and the error returned is " + error.message);
    }
    return throwError("Error occurred! Please try again.");
  }
}
