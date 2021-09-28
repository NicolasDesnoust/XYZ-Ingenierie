import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailPageComponent } from './containers/account-detail-page.component';
import { AccountEditPageComponent } from './containers/account-edit-page.component';
import { AccountListPageComponent } from './containers/account-list-page.component';
import { AccountExistsGuard } from './guards/account-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: AccountListPageComponent,
  },
  {
    path: 'edit/:id',
    component: AccountEditPageComponent,
    canActivate: [AccountExistsGuard],
  },
  {
    path: 'create',
    component: AccountEditPageComponent,
  },
  {
    path: ':id',
    component: AccountDetailPageComponent,
    canActivate: [AccountExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
