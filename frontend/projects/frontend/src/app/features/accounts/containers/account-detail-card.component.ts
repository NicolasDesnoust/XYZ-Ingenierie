import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ButtonDescription,
  ButtonStyle
} from 'projects/frontend/src/app/shared/components/button-list/button-list.component';
import { take } from 'rxjs/operators';
import { Account } from '../model/account';
import { AccountFacade } from '../store/account.facade';
import { AccountDetailPageActions } from '../store/actions';

enum ButtonTypes {
  REMOVE,
  EDIT,
}

@Component({
  selector: 'app-account-detail-card',
  template: `
    <mat-card class="custom-card custom-elevation-z1">
      <mat-card-header class="custom-card-header">
        <mat-card-title class="custom-card-title">Utilisateur</mat-card-title>
        <span class="spacer"></span>
        <app-button-list [buttons]="headerButtons"></app-button-list>
      </mat-card-header>

      <mat-card-content>
        <app-account-detail [account]="account"></app-account-detail>
      </mat-card-content>
    </mat-card>
  `,
})
export class AccountDetailCardComponent implements OnInit {
  @Input() account: Account | null = null;
  headerButtons: ButtonDescription<ButtonTypes>[] = [];

  constructor(private router: Router, private accountFacade: AccountFacade) {}

  ngOnInit(): void {
    this.initializeHeaderButtons();
  }

  private initializeHeaderButtons() {
    this.headerButtons = [
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
        type: ButtonTypes.EDIT,
        text: "Éditer l'utilisateur",
        icon: 'edit',
        style: ButtonStyle.FLAT,
        callback: () => {
          this.accountFacade.selectedAccount$
            .pipe(take(1))
            .subscribe((ref) =>
              this.router.navigate([`/accounts/edit/${ref.id}`])
            );
        },
      },
    ];
  }

  /* --------------------------- Action dispatchers --------------------------- */

  askToDelete(account: Account): void {
    this.accountFacade.dispatch(
      AccountDetailPageActions.askToDeleteAccount({ account })
    );
  }
}
