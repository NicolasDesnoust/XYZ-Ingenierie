import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessage } from '../model/error-message';

@Component({
  selector: 'app-not-found',
  template: `
    <app-error-message [errorMessage]="errorMessage"></app-error-message>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding-bottom: 4rem;
      }
    `,
  ],
})
export class NotFoundComponent {
  errorMessage: ErrorMessage = {
    title: "La page demandée n'a pas été trouvée",
    description:
      "Vous pouvez retourner à la page d'accueil en cliquant sur le bouton ci-dessous.",
    image: {
      url: 'assets/images/not-found.svg',
      width: 1314,
      height: 744,
    },
    button: {
      label: "Aller à l'accueil",
      action: () => this.router.navigate(['/']),
    },
  };

  constructor(private router: Router) {}
}
