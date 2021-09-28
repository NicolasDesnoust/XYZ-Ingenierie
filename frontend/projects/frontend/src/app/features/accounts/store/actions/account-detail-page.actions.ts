import { createAction, props } from '@ngrx/store';
import { Account } from '../../model/account';


/**
 * Ask to delete Account through API Action
 */
export const askToDeleteAccount = createAction(
  '[Account Detail Page] Ask to Delete Account',
  props<{ account: Account }>()
);

/**
 * Select Account to Show Action
 */
export const selectToShow = createAction(
  '[Account Detail Page] Select Account to Show',
  props<{ id: number }>()
);
