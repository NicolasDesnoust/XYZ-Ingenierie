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
import { Account } from '../model/account';
import { AccountFacade } from '../store/account.facade';
import { AccountEditCardActions } from '../store/actions';
import { AccountEditComponent } from './account-edit/account-edit.component';

enum ButtonTypes {
  BACK,
  SAVE,
  REMOVE,
  RESET,
}

@Component({
  selector: 'app-account-edit-card',
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
        <app-account-edit [account]="account"></app-account-edit>
      </mat-card-content>

      <mat-card-actions class="custom-card-actions">
        <span class="spacer"></span>
        <app-button-list [buttons]="footerButtons"></app-button-list>
      </mat-card-actions>
    </mat-card>
  `,
})
export class AccountEditCardComponent implements OnInit, OnChanges {
  @Input() account: Account | null = null;
  private headerButtons: ButtonDescription<ButtonTypes>[] = [];
  filteredHeaderButtons: ButtonDescription<ButtonTypes>[] = [];
  footerButtons: ButtonDescription<ButtonTypes>[] = [];

  @ViewChild(AccountEditComponent) accountEditComponent:
    | AccountEditComponent
    | undefined;

  get cardTitle(): string {
    return this.account?.id != null && this.account?.id != undefined
      ? "Édition d'un utilisateur"
      : "Création d'un utilisateur";
  }

  constructor(
    private accountFacade: AccountFacade,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initializeHeaderButtons();
    this.initializeFooterButtons();
    this.updateFooterButtonsStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.account) {
      if (changes.account.currentValue?.id) {
        this.filteredHeaderButtons = this.headerButtons;
      } else {
        /**
         * We make sure we don't show a delete button when
         * user try to create a new account
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
        text: "Supprimer l'utilisateur",
        icon: 'trash-2',
        style: ButtonStyle.ICON,
        callback: () => {
          this.accountFacade.selectedAccount$
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
          this.resetAccountForm();
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
          this.submitAccountForm();
        },
      },
    ];
  }

  private updateFooterButtonsStatus() {
    this.accountFacade.editState$.subscribe((editState) => {
      const saveButton = this.footerButtons.find(
        (button) => button.type === ButtonTypes.SAVE
      );

      saveButton!.status = editState.underSubmission
        ? ButtonStatus.LOADING
        : ButtonStatus.ENABLED;
    });
  }

  /* --------------------------- Action dispatchers --------------------------- */

  submitAccountForm(): void {
    this.accountFacade.dispatch(AccountEditCardActions.submitEditForm());
  }

  resetAccountForm(): void {
    this.accountFacade.dispatch(AccountEditCardActions.resetEditForm());
  }

  askToDelete(account: Account): void {
    this.accountFacade.dispatch(
      AccountEditCardActions.askToDeleteAccount({ account })
    );
  }

  selectToEdit(id: number): void {
    this.accountFacade.dispatch(AccountEditCardActions.selectToEdit({ id }));
  }

  save(account: Account): void {
    this.accountFacade.dispatch(
      AccountEditCardActions.saveAccount({ account })
    );
  }
}
