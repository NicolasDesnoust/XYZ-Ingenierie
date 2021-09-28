import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.isAuthenticated().pipe(
      map((authenticated: boolean) => {
        return authenticated || this.router.parseUrl('/login');
      }),
      catchError(() => of(this.router.parseUrl('/login')))
    );
  }

  /**
   * Vérifie si l'utilisateur est connecté.
   * Vérifie d'abord localement pour éviter d'envoyer des requêtes inutilement au serveur.
   */
  private isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedLocally().pipe(
      switchMap((authenticatedLocally) => {
        if (authenticatedLocally !== undefined) {
          return of(authenticatedLocally);
        } else {
          return this.isAuthenticatedOnServer();
        }
      })
    );
  }

  private isAuthenticatedLocally(): Observable<boolean | undefined> {
    return this.authenticationService.authenticated;
  }

  private isAuthenticatedOnServer(): Observable<boolean> {
    return this.authenticationService
      .login()
      .pipe(map((response: any) => response?.status != 401));
  }
}
