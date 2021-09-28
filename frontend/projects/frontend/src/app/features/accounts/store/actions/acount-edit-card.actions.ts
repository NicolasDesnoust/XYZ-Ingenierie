import { createAction, props } from '@ngrx/store';
import { Account } from '../../model/account';


/**
 * Ask to delete Account [Action]
 */
export const askToDeleteAccount = createAction(
  '[Account Edit Card] Ask to Delete Account',
  props<{ account: Account }>()
);

/**
 * Select Account to Edit Action
 */
 export const selectToEdit = createAction(
  '[Account Edit Card] Select Account to Edit',
  props<{ id: number }>()
);

/**
 * Save Account through API [Action]
 */
export const saveAccount = createAction(
  '[Account Edit Card] Save Account',
  props<{ account: Account }>()
);

/**
 * Update the value of the account edit form [Action]
 */
 export const updateEditFormValue = createAction(
  '[Account Edit Card] Update the value of the account edit form',
  props<{ value: Partial<Account>, valid: boolean }>()
);

/**
 * Submit Account edit form [Action]
 */
export const submitEditForm = createAction(
  '[Account Edit Card] Sumit Account edit form'
);

/**
 * Reset Account edit form [Action]
 */
 export const resetEditForm = createAction(
  '[Account Edit Card] Reset Account edit form'
);
