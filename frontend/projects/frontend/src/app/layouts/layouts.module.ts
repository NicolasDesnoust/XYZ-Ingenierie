import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { HeaderBarLinksComponent } from './components/header-bar-links/header-bar-links.component';
import { HeaderBarComponent } from './components/header-bar.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrandingComponent } from './components/branding.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { AccordionDirective } from './components/sidemenu/accordion.directive';
import { AccordionItemDirective } from './components/sidemenu/accordionItem.directive';
import { AccordionAnchorDirective } from './components/sidemenu/accordionanchor.directive';

const COMPONENTS = [
  BrandingComponent,
  HeaderBarLinksComponent,
  HeaderBarComponent,
  SidebarComponent,
  SidemenuComponent,
  AccordionAnchorDirective,
  AccordionDirective,
  AccordionItemDirective
];

const LAYOUTS = [MainLayoutComponent];

@NgModule({
  declarations: [COMPONENTS, LAYOUTS],
  imports: [SharedModule],
  exports: [COMPONENTS],
})
export class LayoutsModule {}
