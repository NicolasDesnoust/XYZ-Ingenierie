import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

import { Reference } from '../../core';
import * as dept from '../../data/dept.json';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Role } from '../../auth/role.enum';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import { startWith, map, merge } from 'rxjs/operators';
import * as _ from 'lodash';
import { Domain } from 'src/app/core/model/domain.enum';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reference-show-detail',
  templateUrl: './reference-show-detail.component.html',
  styleUrls: ['reference-show-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferenceShowDetailComponent implements OnChanges, OnInit {
  @Input() reference: Reference;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Reference>();

  addMode = false;
  editingReference: Reference;
  Domain = Domain;
  depts;
  Role = Role;
  filteredDepts: Observable<string[]>;
  deptControl = new FormControl();
  filteredCities: Observable<string[]>;
  citiesControl = new FormControl();
  deptKeys: string[];
  currentYear: number;
  fileName: string;
  role: Role;

  constructor(private matAutoComplete: MatAutocompleteModule,
              private react: ReactiveFormsModule,
              private authService: AuthenticationService,
              private router: Router) {

    this.depts = dept['default'];
    this.deptKeys = Object.keys(this.depts);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.reference && this.reference.id) {
      this.editingReference = { ...this.reference };
      this.addMode = false;
    } else {
      // tslint:disable-next-line:max-line-length
      this.editingReference = { id: undefined, assignmentName: '', clientName: '', city: '', departement: '', yearBeginAssignment: undefined, yearCloseAssignment: undefined, amountBenefit: undefined, benefitDetail: '', picture: '', technicalField: ''};
      this.addMode = true;
    }
  }

  clear() {
    this.unselect.emit();
  }

  saveReference() {
    this.save.emit(this.editingReference);
    this.clear();
  }

  ngOnInit() {

    this.citiesControl.setValue(this.editingReference.city);
    this.deptControl.setValue(this.editingReference.departement);
    this.currentYear = (new Date()).getFullYear();
    this.fileName = '';

    this.filteredDepts = this.deptControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDepts(value))
      );

    this.deptControl.valueChanges.subscribe(val => {
      this.editingReference.departement = val;
    });

    this.citiesControl.valueChanges.subscribe(val => {
      this.editingReference.city = val;
    });

    this.filteredCities = this.citiesControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterCitiesByInput(value)),
      merge(
        this.deptControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this._filterCitiesByDept(val))
        )
      )
    );
  }

  private _filterDepts(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.deptKeys.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterCitiesByDept(value: string): string[] {
    const filterValue = value.toLowerCase();
      let index = this.deptKeys.indexOf(this.editingReference.departement);

      if (index !== -1) {
        let temp: string[] = [];
        this.depts[this.deptKeys[index]].forEach(function(v, i) {
            temp.push( v['cities']);
        });
        return temp;
      }

    return undefined;
  }

  private _filterCitiesByInput(value: string): string[] {
    let res = this._filterCitiesByDept(value);
    const filterValue = value.toLowerCase();
    if (res) {
      return res.filter(option => option.toLowerCase().includes(filterValue));
    } else {
      return undefined;
    }
  }

  private fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    this.fileName = file.name;
  }
}
