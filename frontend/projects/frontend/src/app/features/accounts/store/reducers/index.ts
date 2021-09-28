import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { Account } from '../../model/account';
import * as fromAccounts from './accounts.reducer';
import * as fromCollection from './collection.reducer';
import * as fromEdit from './edit.reducer';

export const accountsFeatureKey = 'accounts';

export interface AccountsState {
  [fromAccounts.accountsFeatureKey]: fromAccounts.State;
  [fromCollection.collectionFeatureKey]: fromCollection.State;
  [fromEdit.collectionFeatureKey]: fromEdit.State;
}

export interface State {
  [accountsFeatureKey]: AccountsState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: AccountsState | undefined, action: Action) {
  return combineReducers({
    [fromAccounts.accountsFeatureKey]: fromAccounts.reducer,
    [fromCollection.collectionFeatureKey]: fromCollection.reducer,
    [fromEdit.collectionFeatureKey]: fromEdit.reducer,
  })(state, action);
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `accounts` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.accountsState$ = state$.pipe(select(getAccountsState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectAccountsState = createFeatureSelector<State, AccountsState>(
  accountsFeatureKey
);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectAccountEntitiesState = createSelector(
  selectAccountsState,
  (state) => state.accounts
);

export const selectSelectedAccountId = createSelector(
  selectAccountEntitiesState,
  fromAccounts.selectId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: selectAccountIds,
  selectEntities: selectAccountEntities,
  selectAll: selectAllAccounts,
  selectTotal: selectTotalAccounts,
} = fromAccounts.adapter.getSelectors(selectAccountEntitiesState);

export const selectSelectedAccount = createSelector(
  selectAccountEntities,
  selectSelectedAccountId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const selectCollectionState = createSelector(
  selectAccountsState,
  (state) => state.collection
);

// * Custom Selector
export const selectCollectionTotalCount = createSelector(
  selectCollectionState,
  fromCollection.getTotalCount
);

export const selectCollectionLoaded = createSelector(
  selectCollectionState,
  fromCollection.getLoaded
);
export const selectCollectionLoading = createSelector(
  selectCollectionState,
  fromCollection.getLoading
);
export const selectCollectionPages = createSelector(
  selectCollectionState,
  fromCollection.getPages
);
export const selectCollectionCurrentPageIndex = createSelector(
  selectCollectionState,
  fromCollection.getCurrentPageIndex
);
export const selectCollectionCurrentPageSize = createSelector(
  selectCollectionState,
  fromCollection.getCurrentPageSize
);

export const selectCollectionCurrentPage = createSelector(
  selectCollectionPages,
  selectCollectionCurrentPageIndex,
  (pages, currentPageIndex) => {
    return pages[currentPageIndex] || [];
  }
);

export const selectAccountCollection = createSelector(
  selectAccountEntities,
  selectCollectionCurrentPage,
  (entities, ids) => {
    return ids
      .map((id) => entities[id])
      .filter((account): account is Account => account != null);
  }
);

export const selectCollectionCurrentSortingProperty = createSelector(
  selectCollectionState,
  fromCollection.getCurrentSortingProperty
);

export const selectCollectionCurrentSortingOrder = createSelector(
  selectCollectionState,
  fromCollection.getCurrentSortingOrder
);

// Edit
export const selectEditState = createSelector(
  selectAccountsState,
  (state) => state.accountForm
);

export const selectFormValue = createSelector(
  selectEditState,
  (editState) => editState.value
);

export const selectFormStatus = createSelector(
  selectEditState,
  (editState) => ({
    valid: editState.valid,
    underSubmission: editState.underSubmission,
  })
);

export const selectAccountBeingEdited = createSelector(
  selectFormValue,
  selectSelectedAccount,
  (formValue, selectedAccount) => {
    return {
      id: -1,
      name: '',
      email: '',
      role: [],
      ...selectedAccount,
      ...formValue,
    };
  }
);
