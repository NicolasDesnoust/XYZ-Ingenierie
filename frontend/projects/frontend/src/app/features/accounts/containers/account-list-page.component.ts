import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Account } from '../model/account';
import { AccountFacade } from '../store/account.facade';

@Component({
  selector: 'app-account-list-page',
  template: `
    <app-account-list-card
      [accounts]="(accounts$ | async) || []"
    ></app-account-list-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListPageComponent {
  accounts$: Observable<Account[]>;

  constructor(private accountFacade: AccountFacade) {
    this.accounts$ = this.accountFacade.accounts$;
  }
}
