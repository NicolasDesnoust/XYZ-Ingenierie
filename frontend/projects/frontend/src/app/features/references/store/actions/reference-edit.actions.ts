import { createAction, props } from '@ngrx/store';

import { Reference } from '../../model/reference';

/**
 * Save Reference through API [Action]
 */
 export const saveReference = createAction(
  '[Reference Edit] Save Reference',
  props<{ reference: Reference }>()
);

/**
 * Update the value of the reference edit form [Action]
 */
 export const updateEditFormValue = createAction(
  '[Reference Edit] Update the value of the reference edit form',
  props<{ value: Partial<Reference>, valid: boolean }>()
);
