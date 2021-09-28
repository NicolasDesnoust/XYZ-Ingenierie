import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NotAuthorizedComponent } from './core/errors/not-authorized.component';
import { NotFoundComponent } from './core/errors/not-found.component';
import { MainLayoutComponent } from './layouts/containers/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'references' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'accounts',
        loadChildren: () =>
          import('./features/accounts/accounts.module').then(
            (m) => m.AccountsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'references',
        loadChildren: () =>
          import('./features/references/references.module').then(
            (m) => m.ReferencesModule
          ),
        data: { title: 'Références' },
        canActivate: [AuthGuard],
      },
      { path: 'about', component: AboutComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
