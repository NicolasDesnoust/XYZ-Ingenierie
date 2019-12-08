import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Reference } from '../../core';
import { HttpClient } from '@angular/common/http';
import { Domain } from '../../core/model/domain.enum';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['reference-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferenceListComponent {
  @Input() references: Reference[];
  @Input() selectedReference: Reference;
  @Output() deleted = new EventEmitter<Reference>();
  @Output() selected = new EventEmitter<Reference>();

  Domain = Domain;
  searchText: string;
  type: string;

  constructor(private http: HttpClient) {
  }

  byId(reference: Reference) {
    return reference.id;
  }

  selectReference(reference: Reference) {
    this.selected.emit(reference);
  }

  deleteReference(reference: Reference) {
    this.deleted.emit(reference);
  }
}
