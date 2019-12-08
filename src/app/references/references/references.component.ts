import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reference } from '../../core';
import { ReferenceService } from '../reference.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html'
})
export class ReferencesComponent implements OnInit {
  selected: Reference;
  references$: Observable<Reference[]>;
  message = '?';
  referenceToDelete: Reference;
  showModal = false;

  constructor(
    private referenceService: ReferenceService // , private modalService: ModalService
  ) {
    this.references$ = referenceService.entities$;
  }

  ngOnInit() {
    this.getReferences();
  }

  add(reference: Reference) {
    this.referenceService.add(reference);
  }

  askToDelete(reference: Reference) {
    this.referenceToDelete = reference;
    this.showModal = true;
    console.log(this.referenceToDelete);
    if (this.referenceToDelete.assignmentName) {
      this.message = `Voulez-vous supprimer la référence intitulée ${this.referenceToDelete.assignmentName}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteReference() {
    this.closeModal();
    if (this.referenceToDelete) {
      this.referenceService
        .delete(this.referenceToDelete.id)
        .subscribe(() => (this.referenceToDelete = null));
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getReferences() {
    this.referenceService.getAll();
    this.clear();
  }

  save(reference: Reference) {
    if (this.selected && this.selected.assignmentName) {
      this.update(reference);
    } else {
      this.add(reference);
    }
  }

  select(reference: Reference) {
    this.selected = reference;
  }

  update(reference: Reference) {
    this.referenceService.update(reference);
  }
}
