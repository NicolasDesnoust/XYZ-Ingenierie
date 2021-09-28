import { createReducer, on } from '@ngrx/store';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import { Account } from '../../model/account';
import {
  AccountDeletionModalActions,
  AccountListPageActions,
  AccountsApiActions
} from '../actions';


export const collectionFeatureKey = 'collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  pages: { [key: number]: number[] };
  totalCount: number;
  // Current Pagination/Sorting/Filtering criterias
  loadOptions: Required<GetAllOptions<Account>>;
}

const initialState: State = {
  loaded: false,
  loading: false,
  pages: {},
  totalCount: 0,
  loadOptions: {
    filter: '',
    _page: 1,
    _limit: 10,
    _sort: 'lastname',
    _order: 'asc',
  },
};

export const reducer = createReducer<State>(
  initialState,
  on(
    AccountListPageActions.loadTablePage,
    AccountListPageActions.changeTablePageSize,
    AccountListPageActions.sort,
    AccountListPageActions.refresh,
    (state): State => ({
      ...state,
      loaded: false,
      loading: true,
    })
  ),
  on(
    AccountsApiActions.loadAccountsSuccess,
    (state, { response }): State => {
      const pageIndex = response.options._page || 1;
      const pageItemIds = response.items.map((account) => account.id);

      return {
        ...state,
        loaded: true,
        loading: false,
        pages: { ...state.pages, [pageIndex]: pageItemIds },
        loadOptions: {
          ...state.loadOptions,
          _page: pageIndex,
        },
        totalCount: response.totalCount,
      };
    }
  ),
  on(
    AccountsApiActions.sortAccountsSuccess,
    (state, { response }): State => {
      const pageItemIds = response.items.map((account) => account.id);
      const _order = response.options?._order;
      const _sort = response.options?._sort;

      return {
        ...state,
        loaded: true,
        loading: false,
        pages: { 1: pageItemIds },
        loadOptions: {
          ...state.loadOptions,
          _page: 1,
          ...(_order && { _order }), // Update _order if not null
          ...(_sort && { _sort }), // Update _sort if not null
        } as any,
        totalCount: response.totalCount,
      };
    }
  ),
  on(
    AccountsApiActions.changeTablePageSizeSuccess,
    (state, { response }): State => {
      const pageItemIds = response.items.map((account) => account.id);
      const _limit = response.options?._limit;

      return {
        ...state,
        loaded: true,
        loading: false,
        pages: { 1: pageItemIds },
        loadOptions: {
          ...state.loadOptions,
          _page: 1,
          ...(_limit && { _limit }), // Update _limit if not null
        },
        totalCount: response.totalCount,
      };
    }
  ),
  on(
    AccountsApiActions.refreshAccountsSuccess,
    (state, { response }): State => {
      const pageItemIds = response.items.map((account) => account.id);

      return {
        ...state,
        loaded: true,
        loading: false,
        pages: { 1: pageItemIds },
        loadOptions: {
          ...state.loadOptions,
          _page: 1,
        },
        totalCount: response.totalCount,
      };
    }
  ),
  on(
    AccountsApiActions.accountsAlreadyLoaded,
    (state, { loadOptions }): State => ({
      ...state,
      loaded: true,
      loading: false,
      loadOptions: {
        ...state.loadOptions,
        _page: loadOptions?._page || 1,
      },
    })
  ),

  on(
    AccountsApiActions.saveAccountSuccess,
    (state, { account }): State => ({
      ...state,
      loadOptions: {
        ...state.loadOptions,
        _page: 1,
      },
      pages: {},
      totalCount: 0,
    })
  ),
  /**
   * Optimistically add account to collection.
   * If this succeeds there's nothing to do.
   * If this fails we revert state by deleting the account.
   *
   * `on` supports handling multiple types of actions
   */
  on(
    AccountsApiActions.deleteAccountFailure, // ? What if remove fail because it has already been removed ?
    (state, { account }): State => {
      const currentPageIndex = state.loadOptions._page;
      const currentPage = state.pages[currentPageIndex];

      if (currentPage.indexOf(account.id) > -1) {
        return state;
      }
      return {
        ...state,
        pages: {
          ...state.pages,
          [currentPageIndex]: [...currentPage, account.id],
        },
      };
    }
  ),
  /**
   * Optimistically delete account from collection.
   * Account is still in accounts array in case we need
   * to rollback the deletion, but it should not be directly accessible.
   * TODO: check if account guard let access to a deleted account
   */
  on(
    AccountDeletionModalActions.acceptAccountDeletion,
    (state, { account }): State => ({
      ...state,
      pages: {
        ...state.pages,
        [state.loadOptions._page]: state.pages[state.loadOptions._page].filter(
          (id) => id !== account.id
        ),
      },
    })
  )
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getPages = (state: State) => state.pages;

export const getTotalCount = (state: State) => state.totalCount;

export const getCurrentPageIndex = (state: State) => state.loadOptions._page;

export const getCurrentPageSize = (state: State) => state.loadOptions._limit;

export const getCurrentSortingOrder = (state: State) =>
  state.loadOptions._order;

export const getCurrentSortingProperty = (state: State) =>
  state.loadOptions._sort;
