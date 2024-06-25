import { Injectable, inject } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from './user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);

  isLoggedIn = new BehaviorSubject<boolean>(false);
  currentUser = new BehaviorSubject<String>("");

  constructor() {
    this.isLoggedIn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this.currentUser = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(environment.urlHost + "/auth/login", credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.isLoggedIn.next(true);
        this.currentUser.next(userData.token);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout() {
    sessionStorage.removeItem("token");
    this.isLoggedIn.next(false);
    this.currentUser.next("");
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  get userData(): Observable<String> {
    return this.currentUser.asObservable();
  }

  get isLoggedInData(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  get userToken(): String {
    return this.currentUser.value;
  }

}
