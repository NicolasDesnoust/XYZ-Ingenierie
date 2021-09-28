import { Location } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  ButtonDescription,
  ButtonStatus,
  ButtonStyle
} from 'projects/frontend/src/app/shared/components/button-list/button-list.component';
import { take } from 'rxjs/operators';
import { ReferenceEditComponent } from '../components/reference-edit/reference-edit.component';
import { Reference } from '../model/reference';
import { ReferenceEditCardActions } from '../store/actions';
import { ReferenceFacade } from '../store/reference.facade';

enum ButtonTypes {
  BACK,
  SAVE,
  REMOVE,
  RESET,
}

@Component({
  selector: 'app-reference-edit-card',
  template: `
    <mat-card class="custom-card custom-elevation-z1">
      <mat-card-header class="custom-card-header">
        <mat-card-title class="custom-card-title">
          {{ cardTitle }}
        </mat-card-title>
        <span class="spacer"></span>
        <app-button-list [buttons]="filteredHeaderButtons"></app-button-list>
      </mat-card-header>

      <mat-card-content class="mt-3">
        <app-reference-edit [reference]="reference"></app-reference-edit>
      </mat-card-content>

      <mat-card-actions class="custom-card-actions">
        <span class="spacer"></span>
        <app-button-list [buttons]="footerButtons"></app-button-list>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ReferenceEditCardComponent implements OnInit, OnChanges {
  @Input() reference: Reference | null = null;
  private headerButtons: ButtonDescription<ButtonTypes>[] = [];
  filteredHeaderButtons: ButtonDescription<ButtonTypes>[] = [];
  footerButtons: ButtonDescription<ButtonTypes>[] = [];

  @ViewChild(ReferenceEditComponent) referenceEditComponent:
    | ReferenceEditComponent
    | undefined;

  get cardTitle(): string {
    return this.reference?.id != null && this.reference?.id != undefined
      ? "Edition d'une référence"
      : "Création d'une référence";
  }

  constructor(
    private referenceFacade: ReferenceFacade,
    private location: Location
  ) {}

  // else {
  //   /**
  //    * We make sure we don't show a delete button when
  //    * user try to create a new reference
  //    */
  //   this.listHeaderButtons = listHeaderButtons.filter(
  //     (button) => button.type !== ButtonTypes.REMOVE
  //   );
  // }

  ngOnInit(): void {
    this.initializeHeaderButtons();
    this.initializeFooterButtons();
    this.updateFooterButtonsStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reference) {
      if (this.reference?.id) {
        this.filteredHeaderButtons = this.headerButtons;
      } else {
        /**
         * We make sure we don't show a delete button when
         * user try to create a new reference
         */
        this.filteredHeaderButtons = this.headerButtons.filter(
          (button) => button.type !== ButtonTypes.REMOVE
        );
      }
    }
  }

  private initializeHeaderButtons() {
    this.filteredHeaderButtons = this.headerButtons = [
      {
        type: ButtonTypes.REMOVE,
        text: 'Supprimer la référence',
        icon: 'trash-2',
        style: ButtonStyle.ICON,
        callback: () => {
          this.referenceFacade.selectedReference$
            .pipe(take(1))
            .subscribe((ref) => this.askToDelete(ref));
        },
      },
      {
        type: ButtonTypes.RESET,
        text: 'Réinitialiser le formulaire',
        icon: 'rotate-cw',
        style: ButtonStyle.ICON,
        callback: () => {
          this.resetReferenceForm();
        },
      },
    ];
  }

  private initializeFooterButtons() {
    this.footerButtons = [
      {
        type: ButtonTypes.BACK,
        text: 'Annuler',
        icon: 'trash-2',
        style: ButtonStyle.STROKED,
        callback: () => {
          this.location.back();
        },
      },
      {
        type: ButtonTypes.SAVE,
        text: 'Sauvegarder les modifications',
        icon: 'save',
        style: ButtonStyle.FLAT,
        callback: () => {
          this.submitReferenceForm();
        },
      },
    ];
  }

  private updateFooterButtonsStatus() {
    this.referenceFacade.editState$.subscribe((editState) => {
      const saveButton = this.footerButtons.find(
        (button) => button.type === ButtonTypes.SAVE
      );

      saveButton!.status = editState.underSubmission
        ? ButtonStatus.LOADING
        : ButtonStatus.ENABLED;
    });
  }

  /* --------------------------- Action dispatchers --------------------------- */

  submitReferenceForm(): void {
    this.referenceFacade.dispatch(ReferenceEditCardActions.submitEditForm());
  }

  resetReferenceForm(): void {
    this.referenceFacade.dispatch(ReferenceEditCardActions.resetEditForm());
  }

  askToDelete(reference: Reference): void {
    this.referenceFacade.dispatch(
      ReferenceEditCardActions.askToDeleteReference({ reference })
    );
  }

  save(reference: Reference): void {
    this.referenceFacade.dispatch(
      ReferenceEditCardActions.saveReference({ reference })
    );
  }
}
