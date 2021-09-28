import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import { GetAllResponse } from 'projects/frontend/src/app/core/model/get-all-response';
import {
  ModalOptions,
  ModalService
} from 'projects/frontend/src/app/shared/components/modal/modal.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Reference } from '../../model/reference';
import { ReferenceService } from '../../services/reference.service';
import {
  ReferenceDeletionModalActions,
  ReferenceDetailPageActions,
  ReferenceEditActions,
  ReferenceEditCardActions,
  ReferenceListPageActions,
  ReferencesApiActions
} from '../actions';
import * as fromReferences from '../reducers';
import { selectCollectionState } from '../reducers';

@Injectable()
export class CollectionEffects {
  private modalOptions: ModalOptions = {
    title: 'Supprimer la référence ?',
    message:
      'Attention : cette suppression est définitive, ' +
      'la référence ne pourra pas être récupérée.',
    cancelText: 'Annuler',
    confirmText: 'Confirmer la suppression',
    confirmColor: 'warn',
  };

  constructor(
    private actions$: Actions,
    private referenceService: ReferenceService,
    private store: Store<fromReferences.State>,
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
      ofType(ReferenceListPageActions.sort),
      withLatestFrom(this.store.select(selectCollectionState)),
      mergeMap(([{ loadOptions }, state]) => {
        const finalOptions = Object.assign({}, state.loadOptions, loadOptions, {
          _page: 1,
        } as GetAllOptions<Reference>);

        return this.referenceService.getAll(finalOptions).pipe(
          map((response: GetAllResponse<Reference>) =>
            ReferencesApiActions.sortReferencesSuccess({ response })
          ),
          catchError((error) =>
            of(ReferencesApiActions.sortReferencesFailure({ error }))
          )
        );
      })
    )
  );

  loadCollectionRefresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceListPageActions.refresh),
      withLatestFrom(this.store.select(selectCollectionState)),
      mergeMap(([payload, state]) => {
        const options = Object.assign({}, state.loadOptions, { _page: 1 });

        return this.referenceService.getAll(options as any).pipe(
          map((response: GetAllResponse<Reference>) =>
            ReferencesApiActions.refreshReferencesSuccess({ response })
          ),
          catchError((error) =>
            of(ReferencesApiActions.refreshReferencesFailure({ error }))
          )
        );
      })
    )
  );

  loadCollectionEnter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceListPageActions.loadTablePage),
      withLatestFrom(this.store.select(selectCollectionState)),
      mergeMap(([{ loadOptions }, state]) => {
        const pageIndex = loadOptions?._page || state.loadOptions._page;

        if (state.pages[pageIndex]?.length > 0) {
          return of(
            ReferencesApiActions.referencesAlreadyLoaded({ loadOptions })
          );
        }

        const options = Object.assign({}, state.loadOptions, loadOptions);

        return this.referenceService.getAll(options).pipe(
          map((response: GetAllResponse<Reference>) =>
            ReferencesApiActions.loadReferencesSuccess({ response })
          ),
          catchError((error) =>
            of(ReferencesApiActions.loadReferencesFailure({ error }))
          )
        );
      })
    )
  );

  changeTablePageSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceListPageActions.changeTablePageSize),
      withLatestFrom(this.store.select(selectCollectionState)),
      mergeMap(([{ loadOptions }, state]) => {
        const options = Object.assign({}, state.loadOptions, loadOptions, {
          _page: 1,
        });

        return this.referenceService.getAll(options).pipe(
          map((response: GetAllResponse<Reference>) =>
            ReferencesApiActions.changeTablePageSizeSuccess({ response })
          ),
          catchError((error) =>
            of(ReferencesApiActions.changeTablePageSizeFailure({ error }))
          )
        );
      })
    )
  );

  /**
   * Open a modal when the user wants to delete a reference.
   * Dispatch additional actions according to user choice (accept
   * or cancel deletion).
   */
  removeReferenceConfirmDialogOpen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ReferenceListPageActions.askToDeleteReference,
        ReferenceEditCardActions.askToDeleteReference,
        ReferenceDetailPageActions.askToDeleteReference
      ),
      mergeMap(({ reference }) => {
        this.modalService.open(this.modalOptions);

        return this.modalService.confirmed().pipe(
          map((confirmed) =>
            confirmed
              ? ReferenceDeletionModalActions.acceptReferenceDeletion({
                  reference,
                })
              : ReferenceDeletionModalActions.cancelReferenceDeletion({
                  reference,
                })
          )
        );
      })
    )
  );

  /**
   * Send a delete request to API when user accepted a reference deletion.
   */
  removeReferenceFromCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceDeletionModalActions.acceptReferenceDeletion),
      mergeMap(({ reference }) =>
        this.referenceService.removeOneById(reference.id).pipe(
          map(() => ReferencesApiActions.deleteReferenceSuccess({ reference })),
          catchError(() =>
            of(ReferencesApiActions.deleteReferenceFailure({ reference }))
          )
        )
      )
    )
  );

  saveReferenceThroughApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceEditActions.saveReference),
      mergeMap(({ reference }) =>
        this.referenceService.saveOne(reference).pipe(
          map((apiResponse) =>
            ReferencesApiActions.saveReferenceSuccess({
              reference: apiResponse,
            })
          ),
          catchError(() =>
            of(ReferencesApiActions.saveReferenceFailure({ reference }))
          )
        )
      )
    )
  );

  durationInSeconds = 3;

  saveReferenceThroughApiSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReferencesApiActions.saveReferenceSuccess),
        tap(({ reference }) => {
          this.snackBar.open('Référence sauvegardée avec succès', undefined, {
            duration: this.durationInSeconds * 1000,
            panelClass: ['mat-toolbar', 'mat-primary'],
          });
          this.router.navigate([`/references/${reference.id}`]);
        })
      ),
    { dispatch: false }
  );

  resetEditForm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReferenceEditCardActions.resetEditForm),
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
