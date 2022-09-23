import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from 'src/app/interface/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  apiURL = 'http://localhost:3000/posts';
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  // get all posts
  getAllPosts() {
    return this.http.get(this.apiURL, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  // get post by id
  getPostById(id: number) {
    return this.http.get(this.apiURL + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // create posts
  createPost(data: Post): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(this.apiURL, body, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // edit posts
  editPost(data: Post): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.patch(this.apiURL + '/' + data.id, body, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // delete post
  deletePost(id: number) {
    return this.http.delete(this.apiURL + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  downloadPosts():Observable<Blob> {
    return this.http.get(this.apiURL, { responseType: 'blob' });
  }

  // handle errors
  handleError(error:HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error("A client side error occurs. The error message is " + error.message);
    }
    else {
      console.error("An error happened in server. The HTTP status code is "  + error.status + " and the error returned is " + error.message);
    }
    return throwError("Error occurred! Please try again.");
  }
}
