import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';

import { CanManageRefsGuard } from '../../core/auth/guards/can-manage-refs.guard';
import { CanSearchFullRefsGuard } from '../../core/auth/guards/can-search-full-refs.guard';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { SharedModule } from '../../shared/shared.module';
import { ReferenceDetailComponent } from './components/reference-detail/reference-detail.component';
import { ReferenceListComponent } from './components/reference-list/reference-list.component';
import { ReferenceShowDetailComponent } from './components/reference-show-detail/reference-show-detail.component';
import { ReferenceShowListComponent } from './components/reference-show-list/reference-show-list.component';
import { ReferencesShowComponent } from './components/references-show/references-show.component';
import { ReferencesComponent } from './components/references/references.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'show',
  },
  {
    path: 'show',
    component: ReferencesShowComponent,
  },
  {
    path: 'show-full',
    component: ReferencesShowComponent,
    canActivate: [CanSearchFullRefsGuard],
  },
  {
    path: 'manage',
    component: ReferencesComponent,
    canActivate: [CanManageRefsGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
  ],
  exports: [ReferencesComponent],
  declarations: [
    ReferencesComponent,
    ReferenceListComponent,
    ReferenceDetailComponent,
    ReferenceShowDetailComponent,
    ReferencesShowComponent,
    ReferenceShowListComponent,
    FilterPipe,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
  ],
})
export class ReferencesModule {}
