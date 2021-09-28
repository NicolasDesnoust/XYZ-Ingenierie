import { createAction, props } from '@ngrx/store';

import { Account } from '../../model/account';

/**
 * Save Account through API [Action]
 */
export const saveAccount = createAction(
  '[Account Edit] Save Account',
  props<{ account: Account }>()
);

/**
 * Update the value of the account edit form [Action]
 */
 export const updateEditFormValue = createAction(
  '[Account Edit] Update the value of the account edit form',
  props<{ value: Partial<Account>, valid: boolean }>()
);
