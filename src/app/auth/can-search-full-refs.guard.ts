import { RulesService } from './rules.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class CanSearchFullRefsGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private rules: RulesService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.auth.currentAccount$.pipe(
        take(1),
        map(account => account && this.rules.canSearchFullRefs(account) ? true : false), // <-- important line
        tap(canView => {
          if (!canView) {
            this.router.navigate(['not-authorized']);
            console.error('Access denied. Must have permission to view content');
          }
        })
      );
  }
}
