import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'lodash';
import { Subscription } from 'rxjs';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

export interface AppSettings {
  navPos?: 'side' | 'top';
  dir?: 'ltr' | 'rtl';
  theme?: 'light' | 'dark';
  showHeader?: boolean;
  headerPos?: 'fixed' | 'static' | 'above';
  showUserPanel?: boolean;
  sidenavOpened?: boolean;
  sidenavCollapsed?: boolean;
  language?: string;
}

export const defaults: AppSettings = {
  navPos: 'side',
  dir: 'ltr',
  theme
  : 'light',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US',
};
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav | undefined;
  @ViewChild('content', { static: true }) content: MatSidenavContent | undefined;
  showSideMenu = true;
  options = defaults;

  private layoutChangesSubscription: Subscription;

  get isOver(): boolean {
    return this.isMobileScreen;
  }
  private isMobileScreen = false;

  @HostBinding('class.matero-content-width-fix') get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options.navPos === 'side' &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }

  private isContentWidthFixed = true;

  @HostBinding('class.matero-sidenav-collapsed-fix') get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options.navPos === 'top' || (this.options.sidenavOpened && this.isOver))
    );
  }

  private isCollapsedWidthFixed = false;


  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private overlay: OverlayContainer,
    private element: ElementRef,
    @Optional() @Inject(DOCUMENT) private document: Document
  ) {
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe(state => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;

        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
        this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    // TODO: Scroll top to container
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
    //   this.content.scrollTo({ top: 0 });
    // });

  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
  }

  sidenavCloseStart() {
    this.isContentWidthFixed = false;
  }

  sidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
  }
}
