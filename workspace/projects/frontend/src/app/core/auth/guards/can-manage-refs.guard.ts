import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, map, take } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { RulesService } from '../services/rules.service';

@Injectable({
  providedIn: 'root',
})
export class CanManageRefsGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private rules: RulesService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.currentAccount$.pipe(
      take(1),
      map((account) =>
        account && this.rules.canManageRefs(account) ? true : false
      ), // <-- important line
      tap((canView) => {
        if (!canView) {
          this.router.navigate(['not-authorized']);
          console.error('Access denied. Must have permission to view content');
        }
      })
    );
  }
}
