import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ResourceService } from './services/resource.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  page = 1;
  per_page = 6;

  constructor(private http: HttpClient, private resource: ResourceService) { }
  ngOnInit(): void {
    this.getBlogs().subscribe(data => {
      this.resource.blogs = data;
    });
  }
  getBlog(id: string) {
    const blog_path = `http://churchinmontreal.ca/wp-json/wp/v2/posts/${id}`;
    return this.http.get(blog_path).pipe(retry(2), catchError(this.handleError));
  }
  getBlogs() {
    const base_path = `http://churchinmontreal.ca/wp-json/wp/v2/posts?page=${this.page}&per_page=${this.per_page}&wpml_language=zh-hans`;
    return this.http.get(base_path).pipe(retry(2), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getPageBlog(page: number) {
    this.page = page;
    return this.getBlogs();
  }
}
