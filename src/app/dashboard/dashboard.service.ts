import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../models/person';
import { CADS } from '../models/cads';
import { Product } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private personUrl = 'assets/json/person.json';
  private cadsUrl = 'assets/json/cads.json';
  private listUrl = 'assets/json/list.json';

  constructor( private http: HttpClient) { }

  getPerson(): Observable<Person> {
    return this.http.get<Person>(this.personUrl).pipe(
      catchError(this.handleError)
    );
  }

  getcads(): Observable<CADS> {
    return this.http.get<CADS>(this.cadsUrl).pipe(
      catchError(this.handleError)
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.listUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}