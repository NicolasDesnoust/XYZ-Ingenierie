import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Reference } from '../../model/reference';
import { ReferenceService } from '../../services/reference.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
})
export class ReferencesComponent implements OnInit {
  selected: Reference | undefined;
  references$: Observable<Reference[]>;
  message = '?';
  referenceToDelete: Reference | undefined;
  showModal = false;

  constructor(
    private referenceService: ReferenceService // , private modalService: ModalService
  ) {
    this.references$ = referenceService.entities$;
  }

  ngOnInit(): void {
    this.getReferences();
  }

  add(reference: Reference): void {
    this.referenceService.add(reference);
  }

  askToDelete(reference: Reference): void {
    this.referenceToDelete = reference;
    this.showModal = true;
    console.log(this.referenceToDelete);
    if (this.referenceToDelete.assignmentName) {
      this.message = `Voulez-vous supprimer la référence intitulée ${this.referenceToDelete.assignmentName}?`;
    }
  }

  clear(): void {
    this.selected = undefined;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteReference(): void {
    this.closeModal();
    if (this.referenceToDelete) {
      this.referenceService
        .delete(this.referenceToDelete.id)
        .subscribe(() => (this.referenceToDelete = undefined));
    }
    this.clear();
  }

  enableAddMode(): void {
    this.selected = <any>{};
  }

  getReferences(): void {
    this.referenceService.getAll();
    this.clear();
  }

  save(reference: Reference): void {
    if (this.selected && this.selected.assignmentName) {
      this.update(reference);
    } else {
      this.add(reference);
    }
  }

  select(reference: Reference): void {
    this.selected = reference;
  }

  update(reference: Reference): void {
    this.referenceService.update(reference);
  }
}
