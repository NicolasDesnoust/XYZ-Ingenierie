import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CustomValidators } from 'projects/frontend/src/app/core/custom-validators';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map, startWith, take } from 'rxjs/operators';
import cities from '../../../../../assets/json/cities.json';
import departments from '../../../../../assets/json/departments.json';
import { Domain } from '../../model/domain';
import { Reference } from '../../model/reference';
import {
  ReferenceEditActions,
  ReferenceEditCardActions
} from '../../store/actions';
import * as fromReferences from '../../store/reducers';

@Component({
  selector: 'app-reference-edit',
  templateUrl: './reference-edit.component.html',
  styleUrls: ['reference-edit.component.scss'],
})
export class ReferenceEditComponent implements OnChanges, OnInit {
  @Input() reference: Reference | null = null;

  referenceForm: FormGroup;

  filteredDepts$: Observable<string[]> | undefined;
  filteredCities$: Observable<string[]> | undefined;
  private currentYear = new Date().getFullYear();
  allDomains: Domain[];

  debounce: number = 300;

  formChange: Subscription | undefined;
  formSubmission: Subscription | undefined;
  formReset: Subscription | undefined;

  extractLabel(domain: Domain) {
    return domain.name;
  }
  extractId(domain: Domain) {
    return domain.id;
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromReferences.State>,
    private actions$: Actions,
    private route: ActivatedRoute
  ) {
    this.allDomains = this.route.snapshot.data.domains;
    this.referenceForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      clientName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      city: ['', [Validators.required, CustomValidators.insideList(cities)]],
      department: [
        '',
        [Validators.required, CustomValidators.insideList(departments)],
      ],
      startYear: [
        '',
        [
          Validators.required,
          Validators.min(1937),
          Validators.max(this.currentYear),
        ],
      ],
      endYear: [
        '',
        [
          Validators.required,
          Validators.min(1937),
          Validators.max(this.currentYear),
        ],
      ],
      benefitAmount: ['', Validators.min(0)],
      benefitDetails: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(2_500),
        ],
      ],
      imageUrl: ['', CustomValidators.url],
      domains: [[], [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.referenceForm.controls;
  }

  ngOnInit(): void {
    this.filteredDepts$ = this.computeAutocompleteOptions(
      this.f.department,
      departments
    );
    this.filteredCities$ = this.computeAutocompleteOptions(this.f.city, cities);

    this.synchronizeFormAndStore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reference) {
      // this.resetReferenceForm();
      this.updateFormInState({
        value: {
          name: this.reference?.name,
          clientName: this.reference?.clientName,
          department: this.reference?.department,
          city: this.reference?.city,
          domains: this.reference?.domains,
          startYear: this.reference?.startYear,
          endYear: this.reference?.endYear,
          imageUrl: this.reference?.imageUrl,
          benefitAmount: this.reference?.benefitAmount,
          benefitDetails: this.reference?.benefitDetails,
        },
        valid: (this.reference?.id || -1) > 0,
      });
    }
  }

  ngOnDestroy(): void {
    this.formChange?.unsubscribe();
    this.formSubmission?.unsubscribe();
    this.formReset?.unsubscribe();
  }

  private synchronizeFormAndStore() {
    // Update the form value based on the state
    this.store
      .select(fromReferences.selectFormValue)
      .pipe(take(1))
      .subscribe((formValue) => this.referenceForm.patchValue(formValue));

    this.formChange = this.referenceForm.valueChanges
      .pipe(debounceTime(this.debounce))
      .subscribe((value) => {
        this.updateFormInState({
          value,
          valid: this.referenceForm.valid,
        });
      });

    this.formSubmission = this.actions$
      .pipe(ofType(ReferenceEditCardActions.submitEditForm))
      .subscribe(() => this.submitReferenceForm());

    this.formReset = this.actions$
      .pipe(ofType(ReferenceEditCardActions.resetEditForm))
      .subscribe(() => this.resetReferenceForm());
  }

  private computeAutocompleteOptions(control: AbstractControl, data: string[]) {
    return control.valueChanges.pipe(
      startWith(control.value),
      map((value) => (typeof value === 'string' ? value : '')),
      filter((value) => value.length >= 2),
      map((value) => this.filter(value, data).slice(0, 30))
    );
  }

  private filter(value: string, toFilter: string[]): string[] {
    const filterValue = value.toLowerCase();

    return toFilter.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private submitReferenceForm(): void {
    this.referenceForm.markAllAsTouched();
    this.referenceForm.controls.imageUrl.markAsDirty();
    if (!this.referenceForm.valid) {
      return;
    }

    const referenceToSubmit: Reference = {
      ...this.referenceForm.value,
    };

    this.saveReference(referenceToSubmit);
  }

  private resetReferenceForm(): void {
    if (this.reference && this.reference.id) {
      const formData = {
        ...this.reference,
      };
      this.referenceForm.reset(formData);
    } else {
      this.referenceForm.reset();
    }
  }

  /* --------------------------- Action dispatchers --------------------------- */

  private saveReference(referenceToSubmit: Reference) {
    this.store.dispatch(
      ReferenceEditActions.saveReference({
        reference: Object.assign({}, this.reference, referenceToSubmit),
      })
    );
  }

  private updateFormInState(formValue: { value: any; valid: boolean }) {
    this.store.dispatch(ReferenceEditActions.updateEditFormValue(formValue));
  }
}
