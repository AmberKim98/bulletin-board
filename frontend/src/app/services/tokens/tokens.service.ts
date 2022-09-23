import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokensService {
  apiURL = 'http://localhost:3000/tokens';
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'}) 
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  saveToken(tokenData: any): Observable<any> {
    return this.httpClient.post(this.apiURL, JSON.stringify(tokenData), this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getTokenData(): Observable<any> {
    return this.httpClient.get(this.apiURL, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  updateToken(id: any): Observable<any> {
    return this.httpClient.patch(this.apiURL + '/' + id, this.httpOptions).pipe(
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
