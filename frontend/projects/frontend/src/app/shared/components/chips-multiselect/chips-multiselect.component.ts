import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-chips-multiselect',
  templateUrl: './chips-multiselect.component.html',
  styleUrls: ['./chips-multiselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: ChipsMultiselectComponent },
  ],
})
export class ChipsMultiselectComponent
  implements
    OnChanges,
    OnDestroy,
    ControlValueAccessor,
    MatFormFieldControl<any[]> {
  @Input() chipListLabel = 'Options choisies';
  @Input() extractLabelCallback: (object: any) => string = (object) =>
    object.name;
  @Input() extractIdCallback: (object: any) => number = (object) => object.id;
  @Input() collection: any[] = [];

  @Input() get value() {
    return this._value;
  }
  set value(newValue: any[]) {
    this._value = newValue || [];
    console.log("set value");
  }
  private _value: any[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredLabels = new BehaviorSubject<string[]>([]);

  onChange: (value: any[]) => void = () => {
    // do nothing.
  };
  onTouched: () => void = () => {
    // do nothing.
  };

  chipsFormControl = new FormControl();

  @ViewChild('objectInput') objectInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  @ViewChild(MatAutocompleteTrigger) autocomplete:
    | MatAutocompleteTrigger
    | undefined;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _elementRef: ElementRef,
    private _cd: ChangeDetectorRef
  ) {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    this.chipsFormControl.valueChanges.subscribe(() =>
      this._updateFilteredObjects()
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(JSON.stringify(changes));
    if (changes.collection || changes.value) {
      this._updateFilteredObjects();
    }
  }

  /* ------------------- Begin MatFormFieldControl contract ------------------ */

  stateChanges = new Subject<void>();

  static nextId = 0;
  @HostBinding() id = `chips-multiselect-${ChipsMultiselectComponent.nextId++}`;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  private _placeholder: string = '';

  touched = false;
  focused = false;
  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }
  onFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as Element;
    if (
      !relatedTarget ||
      (!this._elementRef.nativeElement.contains(relatedTarget) &&
        !relatedTarget.classList.contains('mat-option'))
    ) {
      this.focusOut();
    }
  }

  private focusOut() {
    this.touched = true;
    this.focused = false;
    this.onTouched();
    this.stateChanges.next();
  }

  get empty() {
    return (
      (!this.value || this.value.length === 0) && !this.chipsFormControl.value
    );
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled
      ? this.chipsFormControl.disable()
      : this.chipsFormControl.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  get errorState(): boolean {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  controlType = 'chips-multiselect';
  autofilled?: boolean | undefined;
  @Input('aria-describedby') userAriaDescribedBy?: string;
  setDescribedByIds(ids: string[]) {
    // const controlElement = this._elementRef.nativeElement
    //   .querySelector('.example-tel-input-container')!;
    // controlElement.setAttribute('aria-describedby', ids.join(' '));
  }
  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
      setTimeout(() => this.autocomplete?.openPanel());
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  /* ------------------- End MatFormFieldControl contract ------------------ */

  /* ------------------- Begin ControlValueAccessor contract ------------------ */

  writeValue(newValue: any[]): void {
    console.log('write value ');
    this.value = newValue;
    this._cd.markForCheck();
    this._updateFilteredObjects();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  /* ------------------- End ControlValueAccessor contract ------------------ */

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const trimmedValue = value.trim();
      const newObjects = this.collection.filter(
        (object) => object.name.toLowerCase() === trimmedValue.toLowerCase()
      );
      const objectSet = new Set<Object>(this.value);
      newObjects.forEach((object) => objectSet.add(object));
      this._updateValue(Array.from(objectSet));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.chipsFormControl.setValue(null);
  }

  remove(objectToRemove: Object): void {
    this.focused = false;
    this._updateValue(
      this.value.filter(
        (object) =>
          this.extractIdCallback(object) !==
          this.extractIdCallback(objectToRemove)
      )
    );
    this._updateFilteredObjects();
    this.autocomplete?.closePanel();
    this.focusOut();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newObjects = this.collection.filter(
      (object) => object.name === event.option.viewValue
    );

    this._updateValue([...this.value, ...newObjects]);
    if (this.objectInput) {
      this.objectInput.nativeElement.value = '';
    }
    this.chipsFormControl.setValue(null);
    this.objectInput?.nativeElement.blur();
    this.focusOut();
  }

  private _updateValue(newObjects: any[]) {
    this.value = newObjects;
    this.onChange(this.value);
    this.stateChanges.next();
  }

  private _updateFilteredObjects(): void {
    console.log('update filtered objects');
    let filteredObjects = this._filterByObjectAlreadySelected(this.collection);
    if (this.chipsFormControl.value) {
      filteredObjects = this._filterByValue(
        filteredObjects,
        this.chipsFormControl.value
      );
    }
    const filteredLabels = filteredObjects.map((object) =>
      this.extractLabelCallback(object)
    );
    this.filteredLabels.next(filteredLabels);
  }

  private _filterByValue(objects: Object[], value: string): Object[] {
    const filterValue = value.toLowerCase();

    return objects.filter((object) =>
      this.extractLabelCallback(object).toLowerCase().includes(filterValue)
    );
  }

  private _filterByObjectAlreadySelected(objects: Object[]): Object[] {
    const selectedObjectIdSet = new Set<number>(
      this.value.map((object) => this.extractIdCallback(object))
    );

    return objects.filter(
      (object) => !selectedObjectIdSet.has(this.extractIdCallback(object))
    );
  }
}
