import { createAction, props } from '@ngrx/store';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';

import { Account } from '../../model/account';

/**
 * Load Collection Page Action
 */
export const loadTablePage = createAction(
  '[Account List Page] Load Table Page',
  props<{ loadOptions?: GetAllOptions<Account> }>()
);

/**
 * Change Table Page Size Action
 */
export const changeTablePageSize = createAction(
  '[Account List Page] Change Table Page Size',
  props<{ loadOptions?: GetAllOptions<Account> }>()
);

/**
 * Sort Accounts through API Action
 */
export const sort = createAction(
  '[Account List Page] Sort Accounts',
  props<{ loadOptions?: GetAllOptions<Account> }>()
);

/**
 * Refresh Collection Page Action
 */
export const refresh = createAction('[Account List Page] Refresh Accounts');

/**
 * Ask to delete Account from Collection Action
 */
export const askToDeleteAccount = createAction(
  '[Account List Page] Ask to Delete Account',
  props<{ account: Account }>()
);
