import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../auth/authentication.service';
import { RulesService } from '../auth/rules.service';
import { Account } from './model/account';

@Component({
  selector: 'app-nav',
  template: `
  <nav class="menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <a routerLink="/references/show" routerLinkActive="router-link-active">
        <span>Recherche de références publiques</span>
      </a>

      <a routerLink="/references/show-full" *ngIf="rulesService.canSearchFullRefs(account)" routerLinkActive="router-link-active">
        <span>Recherche de références complètes</span>
      </a>

      <a routerLink="/references/manage" *ngIf="rulesService.canManageRefs(account)" routerLinkActive="router-link-active">
        <span>Création / Édition de références</span>
      </a>

      <a routerLink="/manage-accounts" *ngIf="rulesService.canManageAccounts(account)" routerLinkActive="router-link-active">
        <span>Création / Édition de comptes</span>
      </a>

      <a routerLink="/about" routerLinkActive="router-link-active">
        <span>À propos</span>
      </a>

    </ul>
  </nav>
  `
})
export class NavComponent implements OnInit {
  private account: Account;

  constructor(
    private authService: AuthenticationService,
    private rulesService: RulesService
    ) {

    this.authService.currentAccount$.subscribe({
      next: value => {
        if (value) {
          this.account = value;
        } else {
          this.account = undefined;
        }
      },
      error: error => console.error(error.toString())
  });
  }

  ngOnInit() {}
}
