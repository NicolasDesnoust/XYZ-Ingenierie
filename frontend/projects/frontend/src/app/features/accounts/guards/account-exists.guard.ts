import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { AccountFacade } from '../store/account.facade';
import { AccountExistsGuardActions } from '../store/actions';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountExistsGuard implements CanActivate {
  constructor(
    private accountFacade: AccountFacade,
    private accountService: AccountService,
    private router: Router
  ) {}

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return this.accountFacade.collectionLoaded$.pipe(
      filter((loaded) => true),
      take(1)
    );
  }

  /**
   * This method checks if an account with the given ID is already registered
   * in the Store
   */
  hasAccountInStore(id: number): Observable<boolean> {
    return this.accountFacade.allAccounts$.pipe(
      map((accounts) => !!accounts[id]),
      take(1)
    );
  }

  /**
   * This method loads a account with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasAccountInApi(id: number): Observable<boolean> {
    return this.accountService.getOneById(id).pipe(
      tap((accountEntity) => {
        this.accountFacade.dispatch(
          AccountExistsGuardActions.loadAccount({
            account: accountEntity,
          })
        );
      }),
      map((account) => !!account),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  /**
   * `hasAccount` composes `hasAccountInStore` and `hasAccountInApi`.
   * It first checks if the account is in store, and if not it then checks
   * if it is in the API.
   */
  hasAccount(id: number): Observable<boolean> {
    return this.hasAccountInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasAccountInApi(id);
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a account from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad().pipe(
      switchMap(() => this.hasAccount(route.params['id']))
    );
  }
}
