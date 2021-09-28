import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './auth/components/login/login.component';
import { ErrorMessageComponent } from './errors/error-message.component';
import { NotAuthorizedComponent } from './errors/not-authorized.component';
import { NotFoundComponent } from './errors/not-found.component';

const COMPONENTS = [
  ErrorMessageComponent,
  NotAuthorizedComponent,
  NotFoundComponent,
  LoginComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, FontAwesomeModule, RouterModule, SharedModule],
  exports: [FontAwesomeModule, ...COMPONENTS],
})
export class CoreModule {}
