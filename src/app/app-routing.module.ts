import { CanManageRefsGuard } from './auth/can-manage-refs.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core';
import { AboutComponent } from './about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './auth/user/user.component';
import { UserResolver } from './auth/user/user.resolver';
import { AuthGuard } from './auth/auth.guard';
import { CanReadFullRefsGuard } from './auth/can-read-full-refs.guard';
import { NotAuthorizedComponent } from './core/not-authorized.component';
import { CanManageAccountsGuard } from './auth/can-manage-accounts.guard';
import { CanSearchFullRefsGuard } from './auth/can-search-full-refs.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'references' },
  {
    path: 'manage-accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
    canActivate: [CanManageAccountsGuard]
  },
  {
    path: 'references',
    loadChildren: () => import('./references/references.module').then(m => m.ReferencesModule)
  },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
