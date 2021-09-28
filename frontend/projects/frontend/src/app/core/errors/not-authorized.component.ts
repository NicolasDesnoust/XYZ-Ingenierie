import { Component } from '@angular/core';

@Component({
  selector: 'app-not-authorized',
  template: `
    <div class="content-container">
      <div class="content-title-group not-found">
        <i class="fas fa-exclamation-triangle" aria-hidden="true"></i> &nbsp;
        <span class="title">
          Vous n'êtes pas autorisé à accéder à ce contenu
        </span>
      </div>
    </div>
  `,
})
export class NotAuthorizedComponent {}
