import {
  AfterViewInit, ChangeDetectionStrategy, Component,
  EventEmitter,
  Input, OnChanges, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayedColumns } from 'projects/frontend/src/app/core/model/displayed-columns';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import { Account } from '../../model/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['account-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent implements AfterViewInit, OnChanges {
  @Input() loading = true;
  @Input() accounts: Account[] = [];
  @Input() totalCount = 0;
  @Input() pageSize = 10;
  @Input() sortingProperty: keyof Account = 'firstname';
  @Input() sortingOrder: SortDirection = 'asc'; // TODO: Create specific type
  @Output() deleted = new EventEmitter<Account>();
  @Output() selected = new EventEmitter<Account>();
  @Output() loaded = new EventEmitter<GetAllOptions<Account>>();
  @Output() pageSizeChanged = new EventEmitter<GetAllOptions<Account>>();
  @Output() sorted = new EventEmitter<
    Pick<GetAllOptions<Account>, '_sort' | '_order'>
  >();

  searchText = '';
  type = '';

  dataSource: MatTableDataSource<Account>;
  displayedColumns: DisplayedColumns<Account> = {
    id: { label: 'Id', displayedAuto: true },
    firstname: { label: 'Prénom', displayedAuto: true },
    lastname: { label: 'Nom', displayedAuto: true },
    email: { label: 'E-mail', displayedAuto: true },
    roles: { label: 'Rôles', displayedAuto: false },
    actions: { label: 'Actions', displayedAuto: false },
  };
  displayedColumnNames = Object.keys(this.displayedColumns);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  // tslint:disable-next-line: variable-name
  private _pageIndex = 0;
  @Input() set pageIndex(newValue: number) {
    this._pageIndex = newValue - 1;
  }
  get pageIndex(): number {
    return this._pageIndex;
  }

  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor() {
    this.dataSource = new MatTableDataSource<Account>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.accounts) {
      this.dataSource.data = this.accounts;
    }
  }

  ngAfterViewInit(): void {
    if (this.sort && this.paginator) {
      this.paginator.page.subscribe((pageEvent: PageEvent) => {
        if (pageEvent.pageIndex) {
          this.loadAccountsPage();
        } else if (pageEvent.pageSize) {
          this.changePageSize(pageEvent.pageSize);
        }
      });

      this.sort.sortChange.subscribe(() => {
        const sortOptions: Pick<
          GetAllOptions<Account>,
          '_sort' | '_order'
        > = {
          ...(this.sort?.active && {
            _sort: this.sort.active as keyof Account,
          }),
          ...(this.sort?.direction && { _order: this.sort.direction }),
        };

        this.sorted.emit(sortOptions);
      });
    } else {
      throw new Error('Cannot find MatPaginator or MatSort');
    }
  }

  loadAccountsPage(): void {
    const loadOptions: GetAllOptions<Account> = {
      ...(this.paginator?.pageIndex && {
        _page: this.paginator.pageIndex + 1,
      }),
      ...(this.paginator?.pageSize && { _limit: this.paginator.pageSize }),
      ...(this.sort?.active && { _sort: this.sort.active as keyof Account }),
      ...(this.sort?.direction && { _order: this.sort.direction }),
    };

    this.loaded.emit(loadOptions);
  }

  changePageSize(newSize: number): void {
    const options: GetAllOptions<Account> = {
      ...(newSize && { _limit: newSize }),
    };

    this.pageSizeChanged.emit(options);
  }

  asAccount(account: any): Account {
    return account as Account;
  }
}
