import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="content-container">
      <div class="content-title-group not-found">
        <i class="fas fa-exclamation-triangle" aria-hidden="true"></i> &nbsp;
        <span class="title">Erreur 404: La page ne peut pas être trouvée</span>
      </div>
    </div>
  `,
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
