import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import { GetAllResponse } from 'projects/frontend/src/app/core/model/get-all-response';
import { ModalOptions, ModalService } from 'projects/frontend/src/app/shared/components/modal/modal.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';
import {
  AccountDeletionModalActions,
  AccountDetailPageActions,
  AccountEditActions,
  AccountEditCardActions,
  AccountListPageActions,
  AccountsApiActions
} from '../actions';
import * as fromAccounts from '../reducers';
import { selectCollectionState } from '../reducers';



@Injectable()
export class CollectionEffects {
  private modalOptions: ModalOptions = {
    title: 'Supprimer le compte utilisateur ?',
    message:
      'Attention : cette suppression est définitive, ' +
      'le compte utilisateur ne pourra pas être récupéré.',
    cancelText: 'Annuler',
    confirmText: 'Confirmer la suppression',
    confirmColor: 'warn'
  };

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private store: Store<fromAccounts.State>,
    private modalService: ModalService,
    private readonly router: Router,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Load a page of entites from API based on an action and
   * LoadOptions parameters.
   */
  loadCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountListPageActions.sort),
      withLatestFrom(this.store.select(selectCollectionState)),
      mergeMap(([{ loadOptions }, state]) => {
        const finalOptions = Object.assign({}, state.loadOptions, loadOptions, {
          _page: 1,
        } as GetAllOptions<Account>);

        return this.accountService.getAll(finalOptions).pipe(
          map((response: GetAllResponse<Account>) =>
            AccountsApiActions.sortAccountsSuccess({ response })
          ),
          catchError((error) =>
            of(AccountsApiActions.sortAccountsFailure({ error }))
          )
        );
      })
    )
  );

  loadCollectionRefresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountListPageActions.refresh),
      withLatestFrom(this.store.select(selectCollectionState)),
      mergeMap(([payload, state]) => {
        const options = Object.assign({}, state.loadOptions, { _page: 1 });

        return this.accountService.getAll(options as any).pipe(
          map((response: GetAllResponse<Account>) =>
            AccountsApiActions.refreshAccountsSuccess({ response })
          ),
          catchError((error) =>
            of(AccountsApiActions.refreshAccountsFailure({ error }))
          )
        );
      })
    )
  );

  loadCollectionEnter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountListPageActions.loadTablePage),
      withLatestFrom(this.store.select(selectCollectionState)),
      mergeMap(([{ loadOptions }, state]) => {
        const pageIndex = loadOptions?._page || state.loadOptions._page;

        if (state.pages[pageIndex]?.length > 0) {
          return of(AccountsApiActions.accountsAlreadyLoaded({ loadOptions }));
        }

        const options = Object.assign({}, state.loadOptions, loadOptions);

        return this.accountService.getAll(options).pipe(
          map((response: GetAllResponse<Account>) =>
            AccountsApiActions.loadAccountsSuccess({ response })
          ),
          catchError((error) =>
            of(AccountsApiActions.loadAccountsFailure({ error }))
          )
        );
      })
    )
  );

  changeTablePageSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountListPageActions.changeTablePageSize),
      withLatestFrom(this.store.select(selectCollectionState)),
      mergeMap(([{ loadOptions }, state]) => {
        const options = Object.assign({}, state.loadOptions, loadOptions, {
          _page: 1,
        });

        return this.accountService.getAll(options).pipe(
          map((response: GetAllResponse<Account>) =>
            AccountsApiActions.changeTablePageSizeSuccess({ response })
          ),
          catchError((error) =>
            of(AccountsApiActions.changeTablePageSizeFailure({ error }))
          )
        );
      })
    )
  );

  /**
   * Open a modal when the user wants to delete a account.
   * Dispatch additional actions according to user choice (accept
   * or cancel deletion).
   */
  removeAccountConfirmDialogOpen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AccountListPageActions.askToDeleteAccount,
        AccountEditCardActions.askToDeleteAccount,
        AccountDetailPageActions.askToDeleteAccount
      ),
      mergeMap(({ account }) => {
        this.modalService.open(this.modalOptions);

        return this.modalService.confirmed().pipe(
          map((confirmed) =>
            confirmed
              ? AccountDeletionModalActions.acceptAccountDeletion({
                  account,
                })
              : AccountDeletionModalActions.cancelAccountDeletion({
                  account,
                })
          )
        );
      })
    )
  );

  /**
   * Send a delete request to API when user accepted a account deletion.
   */
  removeAccountFromCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountDeletionModalActions.acceptAccountDeletion),
      mergeMap(({ account }) =>
        this.accountService.removeOneById(account.id).pipe(
          map(() => AccountsApiActions.deleteAccountSuccess({ account })),
          catchError(() =>
            of(AccountsApiActions.deleteAccountFailure({ account }))
          )
        )
      )
    )
  );

  saveAccountThroughApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountEditActions.saveAccount),
      mergeMap(({ account }) =>
        this.accountService.saveOne(account).pipe(
          map((apiResponse) =>
            AccountsApiActions.saveAccountSuccess({
              account: apiResponse,
            })
          ),
          catchError(() =>
            of(AccountsApiActions.saveAccountFailure({ account }))
          )
        )
      )
    )
  );

  durationInSeconds = 3;

  saveAccountThroughApiSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountsApiActions.saveAccountSuccess),
        tap(({ account }) => {
          this.snackBar.open('Utilisateur sauvegardé avec succès', undefined, {
            duration: this.durationInSeconds * 1000,
            panelClass: ['mat-toolbar', 'mat-primary'],
          });
          this.router.navigate([`/accounts/${account.id}`]);
        })
      ),
    { dispatch: false }
  );

  resetEditForm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountEditCardActions.resetEditForm),
        tap(() => {
          this.snackBar.open('Le formulaire a été réinitialisé', undefined, {
            duration: this.durationInSeconds * 1000,
            panelClass: ['mat-toolbar', 'mat-primary'],
          });
        })
      ),
    { dispatch: false }
  );
}
