import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonFooterComponent } from './components/button-footer.component';
import { CardContentComponent } from './components/card-content.component';
import { ListHeaderComponent } from './components/list-header.component';
import { ModalComponent } from './components/modal.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  ButtonFooterComponent,
  CardContentComponent,
  ListHeaderComponent,
  ModalComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [COMPONENTS],
  exports: [
    COMPONENTS,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
