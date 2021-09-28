import { createReducer, on } from '@ngrx/store';
import { Reference } from '../../model/reference';
import { ReferenceEditActions, ReferencesApiActions } from '../actions';

export const collectionFeatureKey = 'referenceForm';

export interface State {
  value: Partial<Reference>;
  valid: boolean;
  underSubmission: boolean;
}

const initialState: State = {
  value: {
   name: '',
   clientName: '',
   department: '',
   city: '',
   benefitDetails: '',
   imageUrl: '',
   domains: []
  },
  valid: false,
  underSubmission: false,
};

export const reducer = createReducer<State>(
  initialState,
  on(
    ReferenceEditActions.updateEditFormValue,
    (state, { value, valid }): State => ({
      ...state,
      value: {
        ...state.value,
        ...value,
      },
      valid,
    })
  ),
  on(
    ReferenceEditActions.saveReference,
    (state): State => ({
      ...state,
      underSubmission: true,
    })
  ),
  on(
    ReferencesApiActions.saveReferenceSuccess,
    ReferencesApiActions.saveReferenceFailure,
    (state): State => ({
      ...state,
      underSubmission: false,
    })
  )
);
