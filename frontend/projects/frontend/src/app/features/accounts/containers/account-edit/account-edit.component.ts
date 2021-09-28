import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Role } from 'projects/frontend/src/app/core/auth/model/role';
import { RoleService } from 'projects/frontend/src/app/core/auth/services/role.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { Account } from '../../model/account';
import {
  AccountEditActions,
  AccountEditCardActions
} from '../../store/actions';
import * as fromAccounts from '../../store/reducers';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() account: Account | null = null;

  accountForm: FormGroup;

  debounce: number = 300;

  formChange: Subscription | undefined;
  formSubmission: Subscription | undefined;
  formReset: Subscription | undefined;

  roles$: Observable<Role[]>;
  selectedRolesValue: Role[] = [];
  get selectedRoles(): Role[] {
    return this.selectedRolesValue;
  }
  set selectedRoles(val: Role[]) {
    this.selectedRolesValue = val;
    this.updateFormInState({
      value: {
        roles: val,
      },
      valid: this.accountForm.valid,
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromAccounts.State>,
    private actions$: Actions,
    private roleService: RoleService
  ) {
    this.accountForm = this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
          Validators.email,
        ],
      ],
      roles: [[], [Validators.required]],
    });

    this.roles$ = this.roleService
      .getAll()
      .pipe(map((response) => response.items));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.accountForm.controls;
  }

  extractLabel(role: Role) {
    return role.name;
  }
  extractId(role: Role) {
    return role.id;
  }

  ngOnInit(): void {
    this.synchronizeFormAndStore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.account) {
      this.updateFormInState({
        value: {
          firstname: this.account?.firstname,
          lastname: this.account?.lastname,
          email: this.account?.email,
          roles: this.account?.roles,
        },
        valid: (this.account?.id || -1) > 0,
      });
    }
  }

  ngOnDestroy(): void {
    this.formChange?.unsubscribe();
    this.formSubmission?.unsubscribe();
    this.formReset?.unsubscribe();
  }

  private synchronizeFormAndStore() {
    // Update the form value based on the state
    this.store
      .select(fromAccounts.selectFormValue)
      .pipe(take(1))
      .subscribe((formValue) => this.accountForm.patchValue(formValue));

    this.formChange = this.accountForm.valueChanges
      .pipe(debounceTime(this.debounce))
      .subscribe((value) =>
        this.updateFormInState({
          value,
          valid: this.accountForm.valid,
        })
      );

    this.formSubmission = this.actions$
      .pipe(ofType(AccountEditCardActions.submitEditForm))
      .subscribe(() => this.submitForm());

    this.formReset = this.actions$
      .pipe(ofType(AccountEditCardActions.resetEditForm))
      .subscribe(() => this.resetAccountForm());
  }

  private submitForm(): void {
    this.accountForm.markAllAsTouched();
    if (!this.accountForm.valid) {
      return;
    }

    const accountToSubmit: Account = {
      ...this.accountForm.value,
    };

    this.saveAccount(accountToSubmit);
  }

  resetAccountForm(): void {
    if (this.account && this.account.id) {
      const formData = { ...this.account };
      this.accountForm.reset(formData);
    } else {
      this.accountForm.reset();
    }
  }

  /* --------------------------- Action dispatchers --------------------------- */

  private saveAccount(accountToSubmit: Account) {
    this.store.dispatch(
      AccountEditActions.saveAccount({
        account: Object.assign({}, this.account, accountToSubmit),
      })
    );
  }

  private updateFormInState(formValue: {
    value: {
      firstname?: string;
      lastname?: string;
      email?: string;
      roles?: Role[];
    };
    valid: boolean;
  }) {
    this.store.dispatch(AccountEditActions.updateEditFormValue(formValue));
  }
}
