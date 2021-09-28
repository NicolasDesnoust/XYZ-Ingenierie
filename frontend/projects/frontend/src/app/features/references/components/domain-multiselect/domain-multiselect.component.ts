import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Domain } from '../../model/domain';

@Component({
  selector: 'app-domain-multiselect',
  templateUrl: './domain-multiselect.component.html',
  styles: [
    `
      :host,
      .example-chip-list {
        width: 100%;
      }
    `,
  ],
})
export class DomainMultiselectComponent implements OnChanges {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredDomains: Observable<string[]> | undefined;
  @Input() domainFormControl = new FormControl();
  @Input() allDomains: Domain[] = [];

  @Input() domains: Domain[] = [];
  @Output() domainsChange = new EventEmitter();

  private updateDomains(val: Domain[]) {
    this.domains = val;
    this.domainsChange.emit(this.domains);
  }

  @ViewChild('domainInput') domainInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.domainFormControl) {
      this.filteredDomains = this.domainFormControl.valueChanges.pipe(
        startWith(null),
        map((value: string | null) =>
          value
            ? this._filterByValue(this.allDomains, value)
            : this.allDomains.slice()
        ),
        map((domains: Domain[]) =>
          this._filterByDomainAlreadySelected(domains)
        ),
        map((domains) => domains.map((domain) => domain.name))
      );
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const trimmedValue = value.trim();
      const newDomains = this.allDomains.filter(
        (domain) => domain.name.toLowerCase() === trimmedValue.toLowerCase()
      );
      const domainSet = new Set<Domain>(this.domains);
      newDomains.forEach((domain) => domainSet.add(domain));
      this.updateDomains(Array.from(domainSet));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.domainFormControl.setValue(null);
  }

  remove(domainToRemove: Domain): void {
    this.updateDomains(
      this.domains.filter((domain) => domain.id !== domainToRemove.id)
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newDomains = this.allDomains.filter(
      (domain) => domain.name === event.option.viewValue
    );

    this.updateDomains([...this.domains, ...newDomains]);
    if (this.domainInput) {
      this.domainInput.nativeElement.value = '';
    }
    this.domainFormControl.setValue(null);
  }

  private _filterByValue(domains: Domain[], value: string): Domain[] {
    const filterValue = value.toLowerCase();

    return domains.filter((domain) =>
      domain.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterByDomainAlreadySelected(domains: Domain[]): Domain[] {
    const selectedDomainIdSet = new Set<number>(
      this.domains.map((domain) => domain.id)
    );

    return domains.filter((domain) => !selectedDomainIdSet.has(domain.id));
  }
}
