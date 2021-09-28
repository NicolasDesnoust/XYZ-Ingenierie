import { createAction, props } from '@ngrx/store';

import { Account } from '../../model/account';

/**
 * Load Account from API Action
 */
export const loadAccount = createAction(
  '[Account Exists Guard] Load Account',
  props<{ account: Account }>()
);
