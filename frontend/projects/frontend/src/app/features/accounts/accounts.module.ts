import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { SharedModule } from '../../shared/shared.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountDetailPageComponent } from './containers/account-detail-page.component';
import { AccountEditPageComponent } from './containers/account-edit-page.component';
import { AccountListPageComponent } from './containers/account-list-page.component';
import { AccountEditComponent } from './containers/account-edit/account-edit.component';
import { CollectionEffects } from './store/effects';
import * as fromAccounts from './store/reducers';
import { AccountDetailCardComponent } from './containers/account-detail-card.component';
import { AccountEditCardComponent } from './containers/account-edit-card.component';
import { AccountListCardComponent } from './containers/account-list-card.component';

const COMPONENTS = [
  AccountListComponent,
  AccountEditComponent,
  AccountDetailComponent,
];

const CONTAINERS = [
  AccountListPageComponent,
  AccountEditPageComponent,
  AccountDetailPageComponent,
  AccountDetailCardComponent,
  AccountEditCardComponent,
  AccountListCardComponent,
];

@NgModule({
  imports: [
    AccountsRoutingModule,
    SharedModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature(
      fromAccounts.accountsFeatureKey,
      fromAccounts.reducers
    ),
    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([CollectionEffects]),
  ],
  exports: [],
  declarations: [COMPONENTS, CONTAINERS],
})
export class AccountsModule {}
