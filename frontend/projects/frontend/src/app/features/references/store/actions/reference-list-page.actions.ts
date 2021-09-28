import { createAction, props } from '@ngrx/store';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';

import { Reference } from '../../model/reference';

/**
 * Load Collection Page Action
 */
export const loadTablePage = createAction(
  '[Reference List Page] Load Table Page',
  props<{ loadOptions?: GetAllOptions<Reference> }>()
);

/**
 * Change Table Page Size Action
 */
export const changeTablePageSize = createAction(
  '[Reference List Page] Change Table Page Size',
  props<{ loadOptions?: GetAllOptions<Reference> }>()
);

/**
 * Sort References through API Action
 */
export const sort = createAction(
  '[Reference List Page] Sort References',
  props<{ loadOptions?: GetAllOptions<Reference> }>()
);

/**
 * Refresh Collection Page Action
 */
export const refresh = createAction('[Reference List Page] Refresh References');

/**
 * Ask to delete Reference from Collection Action
 */
export const askToDeleteReference = createAction(
  '[Reference List Page] Ask to Delete Reference',
  props<{ reference: Reference }>()
);
