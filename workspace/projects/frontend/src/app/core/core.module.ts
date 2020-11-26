import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './auth/components/login/login.component';
import { UserComponent } from './auth/components/user/user.component';
import { NotAuthorizedComponent } from './errors/not-authorized.component';
import { NotFoundComponent } from './errors/not-found.component';

const COMPONENTS = [
  NotAuthorizedComponent,
  NotFoundComponent,
  LoginComponent,
  UserComponent,
];

@NgModule({
  imports: [CommonModule, FontAwesomeModule, RouterModule, SharedModule],
  exports: [FontAwesomeModule, COMPONENTS],
  declarations: [COMPONENTS],
})
export class CoreModule {}
