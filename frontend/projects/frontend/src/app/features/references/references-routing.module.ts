import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferenceDetailPageComponent } from './containers/reference-detail-page.component';
import { ReferenceEditPageComponent } from './containers/reference-edit-page.component';
import { ReferenceListPageComponent } from './containers/reference-list-page.component';
import { ReferenceExistsGuard } from './guards/reference-exists.guard';
import { DomainsResolver } from './services/domains.resolver';

const routes: Routes = [
  {
    path: '',
    component: ReferenceListPageComponent,
  },
  {
    path: 'edit/:id',
    component: ReferenceEditPageComponent,
    canActivate: [ReferenceExistsGuard],
    resolve: {
      domains: DomainsResolver,
    },
  },
  {
    path: 'create',
    component: ReferenceEditPageComponent,
    resolve: {
      domains: DomainsResolver,
    },
  },
  {
    path: ':id',
    component: ReferenceDetailPageComponent,
    canActivate: [ReferenceExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferencesRoutingModule {}
