import { Router } from '@angular/router';
import { Role } from './../../auth/role.enum';
import { Domain } from '../../core/model/domain.enum';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Reference } from '../../core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-reference-show-list',
  templateUrl: './reference-show-list.component.html',
  styleUrls: ['reference-show-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferenceShowListComponent {
  @Input() references: Reference[];
  @Input() selectedReference: Reference;
  @Output() deleted = new EventEmitter<Reference>();
  @Output() selected = new EventEmitter<Reference>();

  Domain = Domain;
  Role = Role;
  searchText: string;
  type: string;
  role: Role;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
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
