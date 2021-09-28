import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Account } from '../model/account';
import { AccountFacade } from '../store/account.facade';
import { AccountEditPageActions } from '../store/actions';


@Component({
  selector: 'app-account-edit-page',
  template: `
    <app-account-edit-card
      [account]="selectedAccount$ | async"
    ></app-account-edit-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountEditPageComponent implements OnInit, OnDestroy {
  selectedAccount$: Observable<Account> | undefined;
  actionsSubscription: Subscription | undefined;

  constructor(
    private accountFacade: AccountFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam$ = this.route.params.pipe(map((params) => params.id));
    const blankAccount$: Observable<any> = idParam$.pipe(
      filter((id) => !id),
      map(() => {})
    );

    this.selectedAccount$ = merge(
      this.accountFacade.selectedAccount$,
      blankAccount$
    );

    this.actionsSubscription = idParam$.subscribe((id: number | null) => {
      if (id) {
        this.selectToEdit(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.actionsSubscription?.unsubscribe();
  }

  /* --------------------------- Action dispatchers --------------------------- */

  selectToEdit(id: number): void {
    this.accountFacade.dispatch(AccountEditPageActions.selectToEdit({ id }));
  }
}
