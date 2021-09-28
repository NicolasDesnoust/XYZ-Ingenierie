import { createAction, props } from '@ngrx/store';

import { Account } from '../../model/account';

/**
 * Cancel Account Deletion [Action]
 */
export const cancelAccountDeletion = createAction(
  '[Account Deletion Modal] Cancel Account Deletion',
  props<{ account: Account }>()
);

/**
 * Accept Account Deletion (through API) [Action]
 */
export const acceptAccountDeletion = createAction(
  '[Account Deletion Modal] Accept Account Deletion',
  props<{ account: Account }>()
);
