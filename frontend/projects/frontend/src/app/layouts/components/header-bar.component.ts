import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  template: `
    <header>
      <mat-toolbar color="primary">
        <button
          mat-button
          class="matero-toolbar-button button-std"
          *ngIf="showToggle"
          (click)="toggleSidenav.emit()"
          matTooltip="Cacher le menu lattéral"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span class="spacer"></span>
        <app-header-bar-links></app-header-bar-links>
      </mat-toolbar>
    </header>
  `,
  styles: [
    `
      .mat-toolbar {
        box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
        z-index: 3;
        height: 54px;
      }
      header {
        display: flex;
      }
    `,
  ],
})
export class HeaderBarComponent {
  @Input() showToggle = true;
  @Output() toggleSidenav = new EventEmitter<void>();
}
