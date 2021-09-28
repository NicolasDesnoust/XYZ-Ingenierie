import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonFooterComponent } from './components/button-footer.component';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { ChipsMultiselectComponent } from './components/chips-multiselect/chips-multiselect.component';
import { EasyDividerComponent } from './components/easy-divider.component';
import { ModalComponent } from './components/modal/modal.component';
import { QuickSearchBarComponent } from './components/quick-search-bar/quick-search-bar.component';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { MatButtonLoadingDirective } from './directives/mat-button-loading.directive';
import { CustomFeatherModule } from './modules/feather.module';
import { MaterialModule } from './modules/material.module';
import { FilterPipe } from './pipes/filter.pipe';

const COMPONENTS = [
  ButtonFooterComponent,
  ButtonListComponent,
  ModalComponent,
  QuickSearchBarComponent,
  EasyDividerComponent,
  ChipsMultiselectComponent,
];

const PIPES = [FilterPipe];

const DIRECTIVES = [MatButtonLoadingDirective, ControlErrorsDirective];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  CustomFeatherModule,
  MaterialModule,
  TranslateModule,
];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  exports: [...COMPONENTS, ...DIRECTIVES, ...PIPES, ...MODULES],
})
export class SharedModule {}
