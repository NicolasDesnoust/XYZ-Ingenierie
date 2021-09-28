import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { interval, Observable, of } from 'rxjs';
import { delayWhen, switchMap } from 'rxjs/operators';
import { Account } from '../model/account';
import * as fromAccounts from './reducers';


@Injectable({
  providedIn: 'root',
})
export class AccountFacade {

  /* -------------------- Expose selectors as Observables -------------------- */

  collectionLoaded$ = this.store.select(fromAccounts.selectCollectionLoaded);
  collectionLoading$ = this.delayValueEmission(
    this.store.select(fromAccounts.selectCollectionLoading),
    400,
    true
  );
  collectionTotalCount$ = this.store.select(
    fromAccounts.selectCollectionTotalCount
  );

  allAccounts$ = this.store.select(fromAccounts.selectAccountEntities);
  // Observable of all accounts inside the current page
  accounts$ = this.store.select(fromAccounts.selectAccountCollection);

  pageIndex$ = this.store.select(fromAccounts.selectCollectionCurrentPageIndex);
  pageSize$ = this.store.select(fromAccounts.selectCollectionCurrentPageSize);

  sortingProperty$ = this.store.select(
    fromAccounts.selectCollectionCurrentSortingProperty
  );
  sortingOrder$ = this.store.select(
    fromAccounts.selectCollectionCurrentSortingOrder
  );

  selectedAccount$ = this.store.select(
    fromAccounts.selectSelectedAccount
  ) as Observable<Account>;

  editState$ = this.store.select(fromAccounts.selectEditState);

  /* Wrap Store<...> dependency */
  constructor(private store: Store<fromAccounts.State>) {}

  /* Actions must be dispatched with this method */
  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  /**
   * Delay emission of specific values from an observable.
   *
   * Make sure that delayed emissions are canceled when
   * non-delayed values are emitted by the observable.
   */
  private delayValueEmission<T>(
    obs: Observable<T>,
    delay: number,
    valueToDelay: T
  ) {
    return obs.pipe(
      switchMap((value) =>
        of(value).pipe(
          delayWhen((val) =>
            val === valueToDelay ? interval(delay) : of(undefined)
          )
        )
      )
    );
  }
}
