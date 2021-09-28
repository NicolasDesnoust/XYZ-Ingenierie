import { createAction, props } from '@ngrx/store';

import { Reference } from '../../model/reference';

/**
 * Cancel Reference Deletion [Action]
 */
export const cancelReferenceDeletion = createAction(
  '[Reference Deletion Modal] Cancel Reference Deletion',
  props<{ reference: Reference }>()
);

/**
 * Accept Reference Deletion (through API) [Action]
 */
export const acceptReferenceDeletion = createAction(
  '[Reference Deletion Modal] Accept Reference Deletion',
  props<{ reference: Reference }>()
);
