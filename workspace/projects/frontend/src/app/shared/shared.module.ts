import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonFooterComponent } from './components/button-footer.component';
import { CardContentComponent } from './components/card-content.component';
import { ListHeaderComponent } from './components/list-header.component';
import { ModalComponent } from './components/modal.component';
import { MaterialModule } from './modules/material.module';

const COMPONENTS = [
  ButtonFooterComponent,
  CardContentComponent,
  ListHeaderComponent,
  ModalComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [COMPONENTS],
  exports: [
    COMPONENTS,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
})
export class SharedModule {}
