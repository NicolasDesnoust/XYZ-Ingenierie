import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ReferenceService } from '../services/reference.service';
import { ReferenceExistsGuardActions } from '../store/actions';
import { ReferenceFacade } from '../store/reference.facade';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable({
  providedIn: 'root',
})
export class ReferenceExistsGuard implements CanActivate {
  constructor(
    private referenceFacade: ReferenceFacade,
    private referenceService: ReferenceService,
    private router: Router
  ) {}

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return this.referenceFacade.collectionLoaded$.pipe(
      filter((_loaded) => true),
      take(1)
    );
  }

  /**
   * This method checks if a reference with the given id is already registered
   * in the Store
   */
  hasReferenceInStore(id: number): Observable<boolean> {
    return this.referenceFacade.allReferences$.pipe(
      map((references) => !!references[id]),
      take(1)
    );
  }

  /**
   * This method loads a reference with the given id from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasReferenceInApi(id: number): Observable<boolean> {
    return this.referenceService.getOneById(id).pipe(
      tap((referenceEntity) => {
        this.referenceFacade.dispatch(
          ReferenceExistsGuardActions.loadReference({
            reference: referenceEntity,
          })
        );
      }),
      map((reference) => !!reference),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  /**
   * `hasReference` composes `hasReferenceInStore` and `hasReferenceInApi`.
   * It first checks if the reference is in store, and if not it then checks
   * if it is in the API.
   */
  hasReference(id: number): Observable<boolean> {
    return this.hasReferenceInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasReferenceInApi(id);
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a reference from the API or if we already have it in our cache.
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
      switchMap(() => this.hasReference(route.params['id']))
    );
  }
}
