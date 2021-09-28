import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { interval, Observable, of } from 'rxjs';
import { switchMap, delayWhen } from 'rxjs/operators';

import { Reference } from '../model/reference';
import * as fromReferences from './reducers';

@Injectable({
  providedIn: 'root',
})
export class ReferenceFacade {

  /* -------------------- Expose selectors as Observables -------------------- */

  collectionLoaded$ = this.store.select(fromReferences.selectCollectionLoaded);
  collectionLoading$ = this.delayValueEmission(
    this.store.select(fromReferences.selectCollectionLoading),
    400,
    true
  );
  collectionTotalCount$ = this.store.select(
    fromReferences.selectCollectionTotalCount
  );

  allReferences$ = this.store.select(fromReferences.selectReferenceEntities);
  // Observable of all references inside the current page
  references$ = this.store.select(fromReferences.selectReferenceCollection);

  pageIndex$ = this.store.select(
    fromReferences.selectCollectionCurrentPageIndex
  );
  pageSize$ = this.store.select(fromReferences.selectCollectionCurrentPageSize);

  sortingProperty$ = this.store.select(
    fromReferences.selectCollectionCurrentSortingProperty
  );
  sortingOrder$ = this.store.select(
    fromReferences.selectCollectionCurrentSortingOrder
  );

  selectedReference$ = this.store.select(
    fromReferences.selectSelectedReference
  ) as Observable<Reference>;

  editState$ = this.store.select(fromReferences.selectEditState);

  /* Wrap Store<...> dependency */
  constructor(private store: Store<fromReferences.State>) {}

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
