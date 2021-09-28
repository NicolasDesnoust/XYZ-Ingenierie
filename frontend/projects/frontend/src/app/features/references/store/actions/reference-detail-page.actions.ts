import { createAction, props } from '@ngrx/store';
import { Reference } from '../../model/reference';

/**
 * Ask to delete Reference through API Action
 */
export const askToDeleteReference = createAction(
  '[Reference Detail Page] Ask to Delete Reference',
  props<{ reference: Reference }>()
);

/**
 * Select Reference to Show Action
 */
export const selectToShow = createAction(
  '[Reference Detail Page] Select Reference to Show',
  props<{ id: number }>()
);
