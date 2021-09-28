import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';

import * as fromReferences from './references.reducer';
import * as fromCollection from './collection.reducer';
import * as fromEdit from './edit.reducer';
import { Reference } from '../../model/reference';

export const referencesFeatureKey = 'references';

export interface ReferencesState {
  [fromReferences.referencesFeatureKey]: fromReferences.State;
  [fromCollection.collectionFeatureKey]: fromCollection.State;
  [fromEdit.collectionFeatureKey]: fromEdit.State;
}

export interface State {
  [referencesFeatureKey]: ReferencesState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: ReferencesState | undefined, action: Action) {
  return combineReducers({
    [fromReferences.referencesFeatureKey]: fromReferences.reducer,
    [fromCollection.collectionFeatureKey]: fromCollection.reducer,
    [fromEdit.collectionFeatureKey]: fromEdit.reducer,
  })(state, action);
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `references` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.referencesState$ = state$.pipe(select(getReferencesState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectReferencesState = createFeatureSelector<
  State,
  ReferencesState
>(referencesFeatureKey);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectReferenceEntitiesState = createSelector(
  selectReferencesState,
  (state) => state.references
);

export const selectSelectedReferenceId = createSelector(
  selectReferenceEntitiesState,
  fromReferences.selectId
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
  selectIds: selectReferenceIds,
  selectEntities: selectReferenceEntities,
  selectAll: selectAllReferences,
  selectTotal: selectTotalReferences,
} = fromReferences.adapter.getSelectors(selectReferenceEntitiesState);

export const selectSelectedReference = createSelector(
  selectReferenceEntities,
  selectSelectedReferenceId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const selectCollectionState = createSelector(
  selectReferencesState,
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

export const selectReferenceCollection = createSelector(
  selectReferenceEntities,
  selectCollectionCurrentPage,
  (entities, ids) => {
    return ids
      .map((id) => entities[id])
      .filter((reference): reference is Reference => reference != null);
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
  selectReferencesState,
  (state) => state.referenceForm
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

export const selectReferenceBeingEdited = createSelector(
  selectFormValue,
  selectSelectedReference,
  (formValue, selectedReference) => {
    return {
      name: '',
      clientName: '',
      department: '',
      city: '',
      benefitDetails: '',
      imageUrl: '',
      domains: [],
      ...selectedReference,
      ...formValue,
    };
  }
);
