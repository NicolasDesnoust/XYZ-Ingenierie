import { NgModule, LOCALE_ID } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { ReferenceDetailComponent } from './components/reference-detail/reference-detail.component';
import { ReferenceEditComponent } from './components/reference-edit/reference-edit.component';
import { ReferenceListComponent } from './components/reference-list/reference-list.component';
import { ReferenceDetailCardComponent } from './containers/reference-detail-card.component';
import { ReferenceDetailPageComponent } from './containers/reference-detail-page.component';
import { ReferenceEditCardComponent } from './containers/reference-edit-card.component';
import { ReferenceEditPageComponent } from './containers/reference-edit-page.component';
import { ReferenceListCardComponent } from './containers/reference-list-card.component';
import { ReferenceListPageComponent } from './containers/reference-list-page.component';
import { ReferencesRoutingModule } from './references-routing.module';
import { CollectionEffects } from './store/effects';
import * as fromReferences from './store/reducers';
import { DomainMultiselectComponent } from './components/domain-multiselect/domain-multiselect.component';

const COMPONENTS = [
  ReferenceListComponent,
  ReferenceEditComponent,
  ReferenceDetailComponent,
];

const CONTAINERS = [
  ReferenceListPageComponent,
  ReferenceEditPageComponent,
  ReferenceDetailPageComponent,
  ReferenceEditCardComponent,
  ReferenceDetailCardComponent,
  ReferenceListCardComponent,
];

@NgModule({
  imports: [
    SharedModule,
    ReferencesRoutingModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature(
      fromReferences.referencesFeatureKey,
      fromReferences.reducers
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
  declarations: [
    COMPONENTS,
    CONTAINERS,
    DomainMultiselectComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
  ],
})
export class ReferencesModule {}
