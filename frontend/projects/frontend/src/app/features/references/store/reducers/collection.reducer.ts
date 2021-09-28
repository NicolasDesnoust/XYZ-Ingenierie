import { createReducer, on } from '@ngrx/store';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import { Reference } from '../../model/reference';
import {
  ReferenceDeletionModalActions,
  ReferenceListPageActions,
  ReferencesApiActions
} from '../actions';


export const collectionFeatureKey = 'collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  pages: { [key: number]: number[] };
  totalCount: number;
  // Current Pagination/Sorting/Filtering criterias
  loadOptions: Required<GetAllOptions<Reference>>;
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
    _sort: 'name',
    _order: 'asc',
  },
};

export const reducer = createReducer<State>(
  initialState,
  on(
    ReferenceListPageActions.loadTablePage,
    ReferenceListPageActions.changeTablePageSize,
    ReferenceListPageActions.sort,
    ReferenceListPageActions.refresh,
    (state): State => ({
      ...state,
      loaded: false,
      loading: true,
    })
  ),
  on(
    ReferencesApiActions.loadReferencesSuccess,
    (state, { response }): State => {
      const pageIndex = response.options._page || 1;
      const pageItemIds = response.items.map((reference) => reference.id);

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
    ReferencesApiActions.sortReferencesSuccess,
    (state, { response }): State => {
      const pageItemIds = response.items.map((reference) => reference.id);
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
    ReferencesApiActions.changeTablePageSizeSuccess,
    (state, { response }): State => {
      const pageItemIds = response.items.map((reference) => reference.id);
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
    ReferencesApiActions.refreshReferencesSuccess,
    (state, { response }): State => {
      const pageItemIds = response.items.map((reference) => reference.id);

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
    ReferencesApiActions.referencesAlreadyLoaded,
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
    ReferencesApiActions.saveReferenceSuccess,
    (state, { reference }): State => ({
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
   * Optimistically add reference to collection.
   * If this succeeds there's nothing to do.
   * If this fails we revert state by deleting the reference.
   *
   * `on` supports handling multiple types of actions
   */
  on(
    ReferencesApiActions.deleteReferenceFailure, // ? What if remove fail because it has already been removed ?
    (state, { reference }): State => {
      const currentPageIndex = state.loadOptions._page;
      const currentPage = state.pages[currentPageIndex];

      if (currentPage.indexOf(reference.id) > -1) {
        return state;
      }
      return {
        ...state,
        pages: {
          ...state.pages,
          [currentPageIndex]: [...currentPage, reference.id],
        },
      };
    }
  ),
  /**
   * Optimistically delete reference from collection.
   * Reference is still in references array in case we need
   * to rollback the deletion, but it should not be directly accessible.
   * TODO: check if reference guard let access to a deleted reference
   */
  on(
    ReferenceDeletionModalActions.acceptReferenceDeletion,
    (state, { reference }): State => ({
      ...state,
      pages: {
        ...state.pages,
        [state.loadOptions._page]: state.pages[state.loadOptions._page].filter(
          (id) => id !== reference.id
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
