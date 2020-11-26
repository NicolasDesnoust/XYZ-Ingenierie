import { Router } from '@angular/router';
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
import { Role } from 'projects/frontend/src/app/core/auth/model/role.enum';

@Component({
  selector: 'app-reference-show-list',
  templateUrl: './reference-show-list.component.html',
  styleUrls: ['reference-show-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceShowListComponent {
  @Input()
  references: Reference[] = [];
  @Input() selectedReference: Reference | undefined;
  @Output() deleted = new EventEmitter<Reference>();
  @Output() selected = new EventEmitter<Reference>();

  Domain = Domain;
  Role = Role;
  searchText = '';
  type = '';
  role: Role | undefined;

  constructor(private http: HttpClient, private router: Router) {}

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
