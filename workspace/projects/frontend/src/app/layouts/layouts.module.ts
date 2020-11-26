import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { HeaderBarBrandComponent } from './components/header-bar-brand.component';
import { HeaderBarLinksComponent } from './components/header-bar-links.component';
import { HeaderBarComponent } from './components/header-bar.component';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './components/nav.component';

const COMPONENTS = [
  HeaderBarBrandComponent,
  HeaderBarLinksComponent,
  HeaderBarComponent,
  NavComponent
];

const LAYOUTS = [
  MainLayoutComponent
];

@NgModule({
  declarations: [COMPONENTS, LAYOUTS],
  imports: [SharedModule],
  exports: [COMPONENTS]
})
export class LayoutsModule {}
