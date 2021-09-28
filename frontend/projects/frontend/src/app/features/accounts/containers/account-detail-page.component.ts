import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../model/account';
import { AccountFacade } from '../store/account.facade';
import { AccountDetailPageActions } from '../store/actions';


@Component({
  selector: 'app-account-detail-page',
  template: `
    <app-account-detail-card
      [account]="selectedAccount$ | async"
    ></app-account-detail-card>
  `,
})
export class AccountDetailPageComponent implements OnDestroy {
  selectedAccount$: Observable<Account>;
  actionsSubscription: Subscription;

  constructor(
    private accountFacade: AccountFacade,
    private route: ActivatedRoute
  ) {
    this.actionsSubscription = this.route.params
      .pipe(map((params) => params.id))
      .subscribe((id: number) => this.selectToShow(id));

    this.selectedAccount$ = this.accountFacade.selectedAccount$;
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }

  /* --------------------------- Action dispatchers --------------------------- */

  selectToShow(id: number): void {
    this.accountFacade.dispatch(AccountDetailPageActions.selectToShow({ id }));
  }
}
