import { createReducer, on } from '@ngrx/store';
import { Account } from '../../model/account';
import { AccountEditActions, AccountsApiActions } from '../actions';

export const collectionFeatureKey = 'accountForm';

export interface State {
  value: Partial<Account>;
  valid: boolean;
  underSubmission: boolean;
}

const initialState: State = {
  value: {
    firstname: '',
    lastname: '',
    email: '',
    roles: [],
  },
  valid: false,
  underSubmission: false,
};

export const reducer = createReducer<State>(
  initialState,
  on(
    AccountEditActions.updateEditFormValue,
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
    AccountEditActions.saveAccount,
    (state): State => ({
      ...state,
      underSubmission: true,
    })
  ),
  on(
    AccountsApiActions.saveAccountSuccess,
    AccountsApiActions.saveAccountFailure,
    (state): State => ({
      ...state,
      underSubmission: false,
    })
  )
);
