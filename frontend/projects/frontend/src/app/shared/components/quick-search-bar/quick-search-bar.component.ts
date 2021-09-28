import { Component } from '@angular/core';

@Component({
  selector: 'app-quick-search-bar',
  template: `
    <div class="filter-bar">
      <mat-form-field class="search-input-field" appearance="outline">
        <mat-label>Recherche rapide par nom, client ou ville</mat-label>
        <i-feather matPrefix name="search"></i-feather>
        <input matInput #input maxlength="50" />
        <mat-hint align="end">{{ input.value?.length || 0 }}/50</mat-hint>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./quick-search-bar.component.scss'],
})
export class QuickSearchBarComponent {}
