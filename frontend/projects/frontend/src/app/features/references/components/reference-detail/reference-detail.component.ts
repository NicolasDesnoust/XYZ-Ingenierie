import { Component, Input } from '@angular/core';
import { Reference } from '../../model/reference';

@Component({
  selector: 'app-reference-detail',
  templateUrl: './reference-detail.component.html',
  styles: [
    `
      .mat-chip.mat-standard-chip {
        background-color: #ebf0ff;
        color: rgb(53 47 89 / 87%);
      }

      .mat-chip {
        width: max-content;
        min-width: 5rem;
        display: flex;
        justify-content: center;
        border-radius: 0.25rem;
        cursor: pointer;
      }
      .mat-list-base .mat-list-item .mat-line:first-child {
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class ReferenceDetailComponent {
  @Input() reference: Reference | null = null;
}
