import { createAction, props } from '@ngrx/store';

import { Reference } from '../../model/reference';

/**
 * Load Reference from API Action
 */
export const loadReference = createAction(
  '[Reference Exists Guard] Load Reference',
  props<{ reference: Reference }>()
);
