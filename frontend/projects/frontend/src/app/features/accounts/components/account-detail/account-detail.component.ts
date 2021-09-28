import { Component, Input } from '@angular/core';
import { Account } from '../../model/account';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
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
export class AccountDetailComponent {
  @Input() account: Account | null = null;
}
