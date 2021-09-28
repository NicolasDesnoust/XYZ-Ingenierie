import { Component, Input, OnInit } from '@angular/core';
import { ErrorMessage } from '../model/error-message';

@Component({
  selector: 'app-error-message',
  template: `
    <img
      [src]="errorMessage.image.url"
      [width]="errorMessage.image.width"
      [height]="errorMessage.image.height"
    />
    <h1>{{ errorMessage.title }}</h1>
    <p>{{ errorMessage.description }}</p>
    <button
      class="button-std mat-elevation-z0"
      mat-flat-button
      color="primary"
      (click)="errorMessage.button.action()"
    >
      {{ errorMessage.button.label }}
    </button>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
      }

      img {
        width: 14rem;
        height: auto;
        margin-bottom: 2rem;
      }

      h1, p {
        text-align: center;
      }

      button {
        margin-top: 1rem;
      }
    `,
  ],
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMessage: ErrorMessage = {
    title: '',
    description: '',
    image: {
      url: '',
      width: 0,
      height: 0,
    },
    button: {
      label: '',
      action: () => {},
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
