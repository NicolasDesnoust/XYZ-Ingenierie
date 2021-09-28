import { Component, Input, OnInit } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import {
  ButtonDescription,
  ButtonStyle
} from 'projects/frontend/src/app/shared/components/button-list/button-list.component';
import { Observable } from 'rxjs';
import { Reference } from '../model/reference';
import { ReferenceListPageActions } from '../store/actions';
import { ReferenceFacade } from '../store/reference.facade';

enum ButtonTypes {
  OPEN_FILTERS_PANEL,
  REFRESH_TABLE,
  NAVIGATE_TO_CREATE_PAGE,
}

@Component({
  selector: 'app-reference-list-card',
  template: `
    <mat-card class="custom-card custom-elevation-z1">
      <mat-card-header class="custom-card-header">
        <mat-card-title class="custom-card-title">
          Références commerciales
        </mat-card-title>
        <span class="spacer"></span>
        <app-button-list [buttons]="headerButtons"></app-button-list>
      </mat-card-header>

      <mat-card-content>
        <app-reference-list
          [references]="references"
          [pageSize]="(pageSize$ | async) || 0"
          [pageIndex]="(pageIndex$ | async) || 0"
          [loading]="(loading$ | async) || false"
          [totalCount]="(totalCount$ | async) || 0"
          (selected)="askToEdit($event)"
          (deleted)="askToDelete($event)"
          (loaded)="load($event)"
          (pageSizeChanged)="changePageSize($event)"
          (sorted)="sort($event)"
        ></app-reference-list>
      </mat-card-content>
    </mat-card>
  `,
})
export class ReferenceListCardComponent implements OnInit {
  @Input() references: Reference[] = [];

  headerButtons: ButtonDescription<ButtonTypes>[] = [];

  loading$: Observable<boolean>;
  totalCount$: Observable<number>;
  // TODO: group pagination and sorting observables
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortingProperty$: Observable<keyof Reference>;
  sortingOrder$: Observable<SortDirection>;

  private _pageIndex = 0;
  @Input() set pageIndex(newValue: number) {
    this._pageIndex = newValue - 1;
  }
  get pageIndex(): number {
    return this._pageIndex;
  }

  constructor(
    private referenceFacade: ReferenceFacade,
    private router: Router
  ) {
    this.totalCount$ = this.referenceFacade.collectionTotalCount$;
    this.pageSize$ = this.referenceFacade.pageSize$;
    this.pageIndex$ = this.referenceFacade.pageIndex$;
    this.sortingProperty$ = this.referenceFacade.sortingProperty$ as any;
    this.sortingOrder$ = this.referenceFacade.sortingOrder$;
    this.loading$ = this.referenceFacade.collectionLoading$;
  }

  ngOnInit(): void {
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
        text: 'Créer une référence',
        icon: 'plus',
        style: ButtonStyle.FLAT,
        callback: () => {
          this.router.navigate([`/references/create`]);
        },
      },
    ];
  }

  askToEdit(reference: Reference): void {
    this.router.navigate([`/references/edit/${reference.id}`]);
  }

  /* --------------------------- Action dispatchers --------------------------- */

  load(loadOptions?: GetAllOptions<Reference>): void {
    this.referenceFacade.dispatch(
      ReferenceListPageActions.loadTablePage({ loadOptions })
    );
  }

  changePageSize(loadOptions?: GetAllOptions<Reference>): void {
    this.referenceFacade.dispatch(
      ReferenceListPageActions.changeTablePageSize({ loadOptions })
    );
  }

  sort(loadOptions?: GetAllOptions<Reference>): void {
    this.referenceFacade.dispatch(
      ReferenceListPageActions.sort({ loadOptions })
    );
  }

  refresh(): void {
    this.referenceFacade.dispatch(ReferenceListPageActions.refresh());
  }

  askToDelete(reference: Reference): void {
    this.referenceFacade.dispatch(
      ReferenceListPageActions.askToDeleteReference({ reference })
    );
  }
}
