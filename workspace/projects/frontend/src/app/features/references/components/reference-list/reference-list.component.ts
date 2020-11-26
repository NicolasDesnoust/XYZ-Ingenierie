import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Reference } from '../../model/reference';
import { Domain } from '../../model/domain.enum';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['reference-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceListComponent {
  @Input()
  references: Reference[] = [];
  @Input()
  selectedReference: Reference | undefined = undefined;
  @Output() deleted = new EventEmitter<Reference>();
  @Output() selected = new EventEmitter<Reference>();

  Domain = Domain;
  searchText = '';
  type = '';

  constructor(private http: HttpClient) {}

  byId(reference: Reference): string {
    return reference.id;
  }

  selectReference(reference: Reference): void {
    this.selected.emit(reference);
  }

  deleteReference(reference: Reference): void {
    this.deleted.emit(reference);
  }
}
