import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Account } from '../../model/account';
import {
  AccountDetailPageActions, AccountEditCardActions, AccountEditPageActions, AccountExistsGuardActions, AccountsApiActions
} from '../actions';


export const accountsFeatureKey = 'accounts';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Account> {
  selectedAccountId: number | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Account> = createEntityAdapter<Account>(
  {
    selectId: (account: Account) => account.id,
    sortComparer: false,
  }
);

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedAccountId: null
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
    AccountsApiActions.loadAccountsSuccess,
    AccountsApiActions.refreshAccountsSuccess,
    AccountsApiActions.sortAccountsSuccess,
    AccountsApiActions.changeTablePageSizeSuccess,
    (state, { response }): State => adapter.addMany(response.items, state)
  ),
  on(
    AccountsApiActions.saveAccountSuccess,
    (state, { account }): State => adapter.upsertOne(account, state) // TODO: verify unselected account
  ),
  /**
   * The addOne function provided by the created adapter
   * adds one record to the entity dictionary
   * and returns a new state including that records if it doesn't
   * exist already. If the collection is to be sorted, the adapter will
   * insert the new record into the sorted array.
   */
  on(
    AccountExistsGuardActions.loadAccount,
    (state, { account }): State => adapter.addOne(account, state)
  ),
  on(
    AccountEditPageActions.selectToEdit,
    AccountEditCardActions.selectToEdit,
    AccountDetailPageActions.selectToShow,
    (state, { id }): State => ({
      ...state,
      selectedAccountId: id,
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

export const selectId = (state: State) => state.selectedAccountId;
