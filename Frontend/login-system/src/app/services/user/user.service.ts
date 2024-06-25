import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httClient = inject(HttpClient)

  constructor() { }

  getUser(id: number): Observable<User> {
    return this.httClient.get<User>(environment.urlApi + '/user/' + id).pipe(
      catchError(this.hadleError)
    )
  }

  updateUser(user: User): Observable<any> {
    return this.httClient.put(environment.urlApi + '/user', user).pipe(
      catchError(this.hadleError)
    )
  }

  private hadleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
