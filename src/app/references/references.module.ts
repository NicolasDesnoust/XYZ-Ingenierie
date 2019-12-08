import { CanSearchFullRefsGuard } from './../auth/can-search-full-refs.guard';
import { NotFoundComponent } from './../core/not-found.component';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ReferenceDetailComponent } from './reference-detail/reference-detail.component';
import { ReferenceListComponent } from './reference-list/reference-list.component';
import { ReferencesComponent } from './references/references.component';

import { ReferenceShowDetailComponent } from './reference-show-detail/reference-show-detail.component';
import { ReferenceShowListComponent } from './reference-show-list/reference-show-list.component';
import { ReferencesShowComponent } from './references-show/references-show.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; //this to use ngModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterPipe } from '../core/pipes/filter.pipe';
import { CanManageRefsGuard } from '../auth/can-manage-refs.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'show'
  },
  {
    path: 'show',
    component: ReferencesShowComponent
  },
  {
    path: 'show-full',
    component: ReferencesShowComponent,
    canActivate: [CanSearchFullRefsGuard]
  },
  {
    path: 'manage',
    component: ReferencesComponent,
    canActivate: [CanManageRefsGuard]

  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),  SharedModule, FormsModule,
    ReactiveFormsModule, MatAutocompleteModule,
    MatFormFieldModule],
  exports: [RouterModule, ReferencesComponent, MatFormFieldModule],
  declarations: [
    ReferencesComponent,
    ReferenceListComponent,
    ReferenceDetailComponent,
    ReferenceShowDetailComponent,
    ReferencesShowComponent,
    ReferenceShowListComponent,
    FilterPipe
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
  ]
})
export class ReferencesModule {}
