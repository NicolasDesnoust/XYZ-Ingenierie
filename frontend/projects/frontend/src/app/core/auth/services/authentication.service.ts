import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/frontend/src/environments/environment';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Credentials } from '../model/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = `${environment.apiUrl}/auth`;

  private authenticatedSubject = new BehaviorSubject<boolean | undefined>(
    undefined
  );
  get authenticated(): Observable<boolean | undefined> {
    return this.authenticatedSubject.asObservable();
  }

  get loginUrl(): string {
    return `${this.baseUrl}/user`;
  }

  private errorSubject$ = new ReplaySubject<Error>(1);
  /**
   * Emits errors that occur during login, or when checking for an active session on startup.
   */
  readonly error$ = this.errorSubject$.asObservable();

  constructor(private http: HttpClient) {
    this.login();
  }

  login(credentials?: Credentials): Observable<any> {
    return this.sendLoginRequest(credentials).pipe(
      tap((response: any) => {
        if (response['name']) {
          this.authenticatedSubject.next(true);
        } else {
          this.authenticatedSubject.next(false);
        }
      }),
      catchError((error: any) => {
        this.errorSubject$.next(error.title);
        return of(error);
      })
    );
  }

  private sendLoginRequest(credentials?: Credentials) {
    const headers = new HttpHeaders(
      credentials
        ? {
            authorization:
              `Basic ` +
              btoa(`${credentials.username}:${credentials.password}`),
          }
        : {}
    );
    return this.http.get(this.loginUrl, { headers });
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/logout`, {})
      .pipe(finalize(() => this.authenticatedSubject.next(false)));
  }
}
