import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="content-container">
      <div class="content-title-group not-found">
        <h2 class="title">Auteurs</h2>
        <p>
          Ce projet a été réalisé par DESNOUST Nicolas et LY Serigne Bassirou
          Mbacké.
        </p>
        <br />
        <h2 class="title">Objectif</h2>
        <p>
          Le but de ce projet est de réaliser une application Web de gestion des
          références commerciales d’une société d’ingénierie factice.
        </p>
      </div>
    </div>
  `,
})
export class AboutComponent {}
