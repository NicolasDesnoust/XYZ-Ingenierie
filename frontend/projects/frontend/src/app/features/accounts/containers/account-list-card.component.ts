import { Component, Input, OnInit } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import {
  ButtonDescription,
  ButtonStyle
} from 'projects/frontend/src/app/shared/components/button-list/button-list.component';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { AccountFacade } from '../store/account.facade';
import { AccountListPageActions } from '../store/actions';

enum ButtonTypes {
  REFRESH_TABLE,
  NAVIGATE_TO_CREATE_PAGE,
}

@Component({
  selector: 'app-account-list-card',
  template: `
    <mat-card class="custom-card custom-elevation-z1">
      <mat-card-header class="custom-card-header">
        <mat-card-title class="custom-card-title">Utilisateurs</mat-card-title>
        <span class="spacer"></span>
        <app-button-list [buttons]="headerButtons"></app-button-list>
      </mat-card-header>
      <mat-card-content>
        <app-account-list
          [accounts]="accounts"
          [pageSize]="(pageSize$ | async) || 0"
          [pageIndex]="(pageIndex$ | async) || 0"
          [loading]="(loading$ | async) || false"
          [totalCount]="(totalCount$ | async) || 0"
          (selected)="navigateToEditPage($event)"
          (deleted)="askToDelete($event)"
          (loaded)="load($event)"
          (pageSizeChanged)="changePageSize($event)"
          (sorted)="sort($event)"
        ></app-account-list>
      </mat-card-content>
    </mat-card>
  `,
})
export class AccountListCardComponent implements OnInit {
  @Input() accounts: Account[] = [];

  headerButtons: ButtonDescription<ButtonTypes>[] = [];
  loading$: Observable<boolean>;
  totalCount$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortingProperty$: Observable<keyof Account>;
  sortingOrder$: Observable<SortDirection>;

  private _pageIndex = 0;
  @Input() set pageIndex(newValue: number) {
    this._pageIndex = newValue - 1;
  }
  get pageIndex(): number {
    return this._pageIndex;
  }

  constructor(private accountFacade: AccountFacade, private router: Router) {
    this.totalCount$ = this.accountFacade.collectionTotalCount$;
    this.pageSize$ = this.accountFacade.pageSize$;
    this.pageIndex$ = this.accountFacade.pageIndex$;
    this.sortingProperty$ = this.accountFacade.sortingProperty$ as any;
    this.sortingOrder$ = this.accountFacade.sortingOrder$;
    this.loading$ = this.accountFacade.collectionLoading$;
  }

  ngOnInit(): void {
    this.load({});
    this.initializeHeaderButtons();
  }

  private initializeHeaderButtons() {
    this.headerButtons = [
      {
        type: ButtonTypes.REFRESH_TABLE,
        text: 'Rafraîchir la page',
        icon: 'refresh-cw',
        style: ButtonStyle.ICON,
        callback: () => {
          this.refresh();
        },
      },
      {
        type: ButtonTypes.NAVIGATE_TO_CREATE_PAGE,
        text: 'Créer un utilisateur',
        icon: 'plus',
        style: ButtonStyle.FLAT,
        callback: () => {
          this.router.navigate([`/accounts/create`]);
        },
      },
    ];
  }

  navigateToEditPage(account: Account): void {
    this.router.navigate([`/accounts/edit/${account.id}`]);
  }

  /* --------------------------- Action dispatchers --------------------------- */

  load(loadOptions?: GetAllOptions<Account>): void {
    this.accountFacade.dispatch(
      AccountListPageActions.loadTablePage({ loadOptions })
    );
  }

  changePageSize(loadOptions?: GetAllOptions<Account>): void {
    this.accountFacade.dispatch(
      AccountListPageActions.changeTablePageSize({ loadOptions })
    );
  }

  sort(loadOptions?: GetAllOptions<Account>): void {
    this.accountFacade.dispatch(AccountListPageActions.sort({ loadOptions }));
  }

  refresh(): void {
    this.accountFacade.dispatch(AccountListPageActions.refresh());
  }

  askToDelete(account: Account): void {
    this.accountFacade.dispatch(
      AccountListPageActions.askToDeleteAccount({ account })
    );
  }
}
