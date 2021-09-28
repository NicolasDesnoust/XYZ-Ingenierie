import { createAction, props } from '@ngrx/store';

/**
 * Select Account to Edit Action
 */
export const selectToEdit = createAction(
  '[Account Edit Page] Select Account to Edit',
  props<{ id: number }>()
);
