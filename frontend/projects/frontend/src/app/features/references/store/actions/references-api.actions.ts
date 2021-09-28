import { createAction, props } from '@ngrx/store';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import { GetAllResponse } from 'projects/frontend/src/app/core/model/get-all-response';

import { Reference } from '../../model/reference';

/**
 * Save Reference through API Actions
 */
export const saveReferenceSuccess = createAction(
  '[References/API] Save Reference Success',
  props<{ reference: Reference }>()
);

export const saveReferenceFailure = createAction(
  '[References/API] Save Reference Failure',
  props<{ reference: Reference }>()
);

/**
 * Delete Reference through API Actions
 */
export const deleteReferenceSuccess = createAction(
  '[References/API] Delete Reference Success',
  props<{ reference: Reference }>()
);

export const deleteReferenceFailure = createAction(
  '[References/API] Delete Reference Failure',
  props<{ reference: Reference }>()
);

/**
 * Load References from API Actions
 */
export const loadReferencesSuccess = createAction(
  '[References/API] Load References Success',
  props<{ response: GetAllResponse<Reference> }>()
);

export const loadReferencesFailure = createAction(
  '[References/API] Load References Failure',
  props<{ error: any }>()
);

export const referencesAlreadyLoaded = createAction(
  '[References/API] References Already Loaded',
  props<{ loadOptions?: GetAllOptions<Reference> }>()
);

/**
 * Refresh References from API Actions
 */
export const refreshReferencesSuccess = createAction(
  '[References/API] Refresh References Success',
  props<{ response: GetAllResponse<Reference> }>()
);

export const refreshReferencesFailure = createAction(
  '[References/API] Refresh References Failure',
  props<{ error: any }>()
);

/**
 * Sort References from API Actions
 */
export const sortReferencesSuccess = createAction(
  '[References/API] Sort References Success',
  props<{ response: GetAllResponse<Reference> }>()
);

export const sortReferencesFailure = createAction(
  '[References/API] Sort References Failure',
  props<{ error: any }>()
);

/**
 * Change Table Page Size Actions
 */
export const changeTablePageSizeSuccess = createAction(
  '[References/API] Change Table Page Size Success',
  props<{ response: GetAllResponse<Reference> }>()
);

export const changeTablePageSizeFailure = createAction(
  '[References/API] Change Table Page Size Failure',
  props<{ error: any }>()
);
