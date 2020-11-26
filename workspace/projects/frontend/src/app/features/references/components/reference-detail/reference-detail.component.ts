import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { startWith, map, merge } from 'rxjs/operators';

import * as _ from 'lodash';
import { Reference } from '../../model/reference';
import * as dept from '../../../../../assets/json/dept.json';
import { Domain } from '../../model/domain.enum';

@Component({
  selector: 'app-reference-detail',
  templateUrl: './reference-detail.component.html',
  styleUrls: ['reference-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceDetailComponent implements OnChanges, OnInit {
  @Input() reference: Reference | undefined;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Reference>();

  addMode = false;
  editingReference: Reference | undefined;
  Domain = Domain;
  depts: any;
  filteredDepts: Observable<string[]> | undefined;
  deptControl = new FormControl();
  filteredCities: Observable<string[] | undefined> | undefined;
  citiesControl = new FormControl();
  deptKeys: string[];
  currentYear: number | undefined;
  fileName: string | undefined;

  constructor(
    private matAutoComplete: MatAutocompleteModule,
    private react: ReactiveFormsModule
  ) {
    // this.depts = dept['default'];
    this.deptKeys = Object.keys(this.depts);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reference && this.reference.id) {
      this.editingReference = { ...this.reference };
      this.addMode = false;
    } else {
      // tslint:disable-next-line:max-line-length
      this.editingReference = {
        id: '',
        assignmentName: '',
        clientName: '',
        city: '',
        departement: '',
        yearBeginAssignment: 0,
        yearCloseAssignment: 0,
        amountBenefit: 0,
        benefitDetail: '',
        picture: '',
        technicalField: '',
      };
      this.addMode = true;
    }
  }

  clear(): void {
    this.unselect.emit();
  }

  saveReference(): void {
    this.save.emit(this.editingReference);
    this.clear();
  }

  ngOnInit(): void {
    this.citiesControl.setValue(this.editingReference?.city);
    this.deptControl.setValue(this.editingReference?.departement);
    this.currentYear = new Date().getFullYear();
    this.fileName = '';

    this.filteredDepts = this.deptControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDepts(value))
    );

    this.deptControl.valueChanges.subscribe((val) => {
      this.editingReference!.departement = val;
    });

    this.citiesControl.valueChanges.subscribe((val) => {
      this.editingReference!.city = val;
    });

    this.filteredCities = this.citiesControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCitiesByInput(value)),
      merge(
        this.deptControl.valueChanges.pipe(
          startWith(''),
          map((val) => this._filterCitiesByDept(val))
        )
      )
    );
  }

  private _filterDepts(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.deptKeys.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterCitiesByDept(value: string): string[] | undefined {
    const filterValue = value.toLowerCase();
    const index = this.deptKeys.indexOf(this.editingReference!.departement);

    if (index !== -1) {
      const temp: string[] = [];
      this.depts[this.deptKeys[index]].forEach(function (v: { [x: string]: string; }, i: any) {
        temp.push(v['cities']);
      });
      return temp;
    }

    return undefined;
  }

  private _filterCitiesByInput(value: string): string[] | undefined {
    const res = this._filterCitiesByDept(value);
    const filterValue = value.toLowerCase();
    if (res) {
      return res.filter((option) => option.toLowerCase().includes(filterValue));
    } else {
      return undefined;
    }
  }

  private fileEvent(fileInput: Event) {
    const file = (<HTMLInputElement>fileInput.target).files![0];
    this.fileName = file.name;
  }
}
