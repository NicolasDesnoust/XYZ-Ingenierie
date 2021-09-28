import { createAction, props } from '@ngrx/store';

/**
 * Select Reference to Edit Action
 */
export const selectToEdit = createAction(
  '[Reference Edit Page] Select Reference to Edit',
  props<{ id: number }>()
);
