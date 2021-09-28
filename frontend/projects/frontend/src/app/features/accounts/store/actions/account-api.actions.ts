import { createAction, props } from '@ngrx/store';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import { GetAllResponse } from 'projects/frontend/src/app/core/model/get-all-response';

import { Account } from '../../model/account';

/**
 * Save Account through API Actions
 */
export const saveAccountSuccess = createAction(
  '[Accounts/API] Save Account Success',
  props<{ account: Account }>()
);

export const saveAccountFailure = createAction(
  '[Accounts/API] Save Account Failure',
  props<{ account: Account }>()
);

/**
 * Delete Account through API Actions
 */
export const deleteAccountSuccess = createAction(
  '[Accounts/API] Delete Account Success',
  props<{ account: Account }>()
);

export const deleteAccountFailure = createAction(
  '[Accounts/API] Delete Account Failure',
  props<{ account: Account }>()
);

/**
 * Load Accounts from API Actions
 */
export const loadAccountsSuccess = createAction(
  '[Accounts/API] Load Accounts Success',
  props<{ response: GetAllResponse<Account> }>()
);

export const loadAccountsFailure = createAction(
  '[Accounts/API] Load Accounts Failure',
  props<{ error: any }>()
);

export const accountsAlreadyLoaded = createAction(
  '[Accounts/API] Accounts Already Loaded',
  props<{ loadOptions?: GetAllOptions<Account> }>()
);

/**
 * Refresh Accounts from API Actions
 */
export const refreshAccountsSuccess = createAction(
  '[Accounts/API] Refresh Accounts Success',
  props<{ response: GetAllResponse<Account> }>()
);

export const refreshAccountsFailure = createAction(
  '[Accounts/API] Refresh Accounts Failure',
  props<{ error: any }>()
);

/**
 * Sort Accounts from API Actions
 */
export const sortAccountsSuccess = createAction(
  '[Accounts/API] Sort Accounts Success',
  props<{ response: GetAllResponse<Account> }>()
);

export const sortAccountsFailure = createAction(
  '[Accounts/API] Sort Accounts Failure',
  props<{ error: any }>()
);

/**
 * Change Table Page Size Actions
 */
export const changeTablePageSizeSuccess = createAction(
  '[Accounts/API] Change Table Page Size Success',
  props<{ response: GetAllResponse<Account> }>()
);

export const changeTablePageSizeFailure = createAction(
  '[Accounts/API] Change Table Page Size Failure',
  props<{ error: any }>()
);
