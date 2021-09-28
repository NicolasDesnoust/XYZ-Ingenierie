import { createAction, props } from '@ngrx/store';

import { Reference } from '../../model/reference';

/**
 * Ask to delete Reference Action
 */
export const askToDeleteReference = createAction(
  '[Reference Edit Card] Ask to Delete Reference',
  props<{ reference: Reference }>()
);

/**
 * Save Reference through API Action
 */
export const saveReference = createAction(
  '[Reference Edit Card] Save Reference',
  props<{ reference: Reference }>()
);

/**
 * Update the value of the reference edit form [Action]
 */
export const updateEditFormValue = createAction(
  '[Reference Edit Card] Update the value of the reference edit form',
  props<{ value: Partial<Reference>; valid: boolean }>()
);

/**
 * Submit Reference edit form [Action]
 */
export const submitEditForm = createAction(
  '[Reference Edit Card] Sumit Reference edit form'
);

/**
 * Reset Reference edit form [Action]
 */
export const resetEditForm = createAction(
  '[Reference Edit Card] Reset Reference edit form'
);
