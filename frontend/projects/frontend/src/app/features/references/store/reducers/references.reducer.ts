import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Reference } from '../../model/reference';
import {
  ReferenceDetailPageActions,
  ReferenceEditPageActions,
  ReferenceExistsGuardActions,
  ReferencesApiActions
} from '../actions';

export const referencesFeatureKey = 'references';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by code. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Reference> {
  selectedReferenceId: number | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record cpde selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Reference> = createEntityAdapter<Reference>(
  {
    selectId: (reference: Reference) => reference.id,
    sortComparer: false,
  }
);

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedReferenceId: null,
});

export const reducer = createReducer(
  initialState,
  /**
   * The addMany function provided by the created adapter
   * adds many records to the entity dictionary
   * and returns a new state including those records. If
   * the collection is to be sorted, the adapter will
   * sort each record upon entry into the sorted array.
   */
  on(
    ReferencesApiActions.loadReferencesSuccess,
    ReferencesApiActions.refreshReferencesSuccess,
    ReferencesApiActions.sortReferencesSuccess,
    ReferencesApiActions.changeTablePageSizeSuccess,
    (state, { response }): State => adapter.addMany(response.items, state)
  ),
  on(
    ReferencesApiActions.saveReferenceSuccess,
    (state, { reference }): State => adapter.upsertOne(reference, state) // TODO: verify unselected reference
  ),
  /**
   * The addOne function provided by the created adapter
   * adds one record to the entity dictionary
   * and returns a new state including that records if it doesn't
   * exist already. If the collection is to be sorted, the adapter will
   * insert the new record into the sorted array.
   */
  on(
    ReferenceExistsGuardActions.loadReference,
    (state, { reference }): State => adapter.addOne(reference, state)
  ),
  on(
    ReferenceEditPageActions.selectToEdit,
    ReferenceDetailPageActions.selectToShow,
    (state, { id }): State => ({
      ...state,
      selectedReferenceId: id,
    })
  )
);

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const selectId = (state: State) => state.selectedReferenceId;
