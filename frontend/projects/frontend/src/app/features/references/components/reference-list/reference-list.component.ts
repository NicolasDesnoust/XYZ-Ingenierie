import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayedColumns } from 'projects/frontend/src/app/core/model/displayed-columns';
import { GetAllOptions } from 'projects/frontend/src/app/core/model/get-all-options';
import { Reference } from '../../model/reference';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['reference-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceListComponent implements AfterViewInit, OnChanges {
  @Input() loading = true;
  @Input() references: Reference[] = [];
  @Input() totalCount = 0;
  @Input() pageSize = 10;
  @Input() sortingProperty: keyof Reference = 'name';
  @Input() sortingOrder: SortDirection = 'asc'; // TODO: Create specific type
  @Output() deleted = new EventEmitter<Reference>();
  @Output() selected = new EventEmitter<Reference>();
  @Output() loaded = new EventEmitter<GetAllOptions<Reference>>();
  @Output() pageSizeChanged = new EventEmitter<GetAllOptions<Reference>>();
  @Output() sorted = new EventEmitter<
    Pick<GetAllOptions<Reference>, '_sort' | '_order'>
  >();

  searchText = '';
  type = '';

  dataSource: MatTableDataSource<Reference>;
  displayedColumns: DisplayedColumns<Reference> = {
    id: { label: 'Id', displayedAuto: true },
    name: { label: 'Nom', displayedAuto: true },
    clientName: { label: 'Client', displayedAuto: true },
    city: { label: 'Ville', displayedAuto: true },
    department: { label: 'Département', displayedAuto: true },
    startYear: { label: 'Année de début', displayedAuto: true },
    endYear: { label: 'Année de fin', displayedAuto: true },
    benefitAmount: { label: 'Bénéfices', displayedAuto: false },
    domains: { label: 'Domaines', displayedAuto: false },
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
    this.dataSource = new MatTableDataSource<Reference>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.references) {
      this.dataSource.data = this.references;
    }
  }

  ngAfterViewInit(): void {
    if (this.sort && this.paginator) {
      this.paginator.page.subscribe((pageEvent: PageEvent) => {
        if (pageEvent.pageIndex) {
          this.loadReferencesPage();
        } else if (pageEvent.pageSize) {
          this.changePageSize(pageEvent.pageSize);
        }
      });

      this.sort.sortChange.subscribe(() => {
        const sortOptions: Pick<
          GetAllOptions<Reference>,
          '_sort' | '_order'
        > = {
          ...(this.sort?.active && {
            _sort: this.sort.active as keyof Reference,
          }),
          ...(this.sort?.direction && { _order: this.sort.direction }),
        };

        this.sorted.emit(sortOptions);
      });
    } else {
      throw new Error('Cannot find MatPaginator or MatSort');
    }
  }

  loadReferencesPage(): void {
    const loadOptions: GetAllOptions<Reference> = {
      ...(this.paginator?.pageIndex && {
        _page: this.paginator.pageIndex + 1,
      }),
      ...(this.paginator?.pageSize && { _limit: this.paginator.pageSize }),
      ...(this.sort?.active && { _sort: this.sort.active as keyof Reference }),
      ...(this.sort?.direction && { _order: this.sort.direction }),
    };

    this.loaded.emit(loadOptions);
  }

  changePageSize(newSize: number): void {
    const options: GetAllOptions<Reference> = {
      ...(newSize && { _limit: newSize }),
    };

    this.pageSizeChanged.emit(options);
  }

  asReference(reference: any): Reference {
    return reference as Reference;
  }
}
