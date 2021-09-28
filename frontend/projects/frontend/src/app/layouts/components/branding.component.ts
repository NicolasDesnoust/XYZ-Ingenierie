import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="/">
      <!-- <img
        src="./assets/images/matero.png"
        class="matero-branding-logo-expanded"
        alt="logo"
      /> -->
      <span class="matero-branding-name ml-4">XYZ Ingénierie</span>
    </a>
  `,
})
export class BrandingComponent {}
