import { Component } from '@angular/core';

@Component({
  selector: 'app-header-bar-brand',
  template: `
    <div class="navbar-brand">
      <a class="navbar-item nav-home" [routerLink]="['/']">
        <span class="X">X</span>
        <span class="Y">Y</span>
        <span class="Z">Z</span>
        <span class="Ingenierie">&nbsp;Ingénierie</span>
      </a>
      <button
        class="link navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span> <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>
  `,
})
export class HeaderBarBrandComponent {}
