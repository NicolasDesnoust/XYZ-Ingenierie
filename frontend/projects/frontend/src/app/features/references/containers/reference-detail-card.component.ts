import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ButtonDescription,
  ButtonStyle
} from 'projects/frontend/src/app/shared/components/button-list/button-list.component';
import { take } from 'rxjs/operators';
import { Reference } from '../model/reference';
import { ReferenceDetailPageActions } from '../store/actions';
import { ReferenceFacade } from '../store/reference.facade';

enum ButtonTypes {
  REMOVE,
  EDIT,
}

@Component({
  selector: 'app-reference-detail-card',
  template: `
    <mat-card class="custom-card custom-elevation-z1">
      <mat-card-header class="custom-card-header">
        <mat-card-title class="custom-card-title">
          Référence commerciale
        </mat-card-title>
        <span class="spacer"></span>
        <app-button-list [buttons]="headerButtons"></app-button-list>
      </mat-card-header>
      <mat-card-content>
        <app-reference-detail [reference]="reference"></app-reference-detail>
      </mat-card-content>
    </mat-card>
  `,
})
export class ReferenceDetailCardComponent implements OnInit {
  @Input() reference: Reference | null = null;
  headerButtons: ButtonDescription<ButtonTypes>[] = [];

  constructor(
    private referenceFacade: ReferenceFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeHeaderButtons();
  }

  private initializeHeaderButtons() {
    this.headerButtons = [
      {
        type: ButtonTypes.REMOVE,
        text: 'Supprimer la référence',
        icon: 'trash-2',
        style: ButtonStyle.ICON,
        callback: () => {
          this.referenceFacade.selectedReference$
            .pipe(take(1))
            .subscribe((ref) => this.askToDelete(ref));
        },
      },
      {
        type: ButtonTypes.EDIT,
        text: 'Éditer la référence',
        icon: 'edit',
        style: ButtonStyle.FLAT,
        callback: () => {
          this.referenceFacade.selectedReference$
            .pipe(take(1))
            .subscribe((ref) =>
              this.router.navigate([`/references/edit/${ref.id}`])
            );
        },
      },
    ];
  }

  /* --------------------------- Action dispatchers --------------------------- */

  askToDelete(reference: Reference): void {
    this.referenceFacade.dispatch(
      ReferenceDetailPageActions.askToDeleteReference({ reference })
    );
  }
}
