import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../core/auth/services/authentication.service';
import { UserService } from '../../core/auth/services/user.service';

@Component({
  selector: 'app-header-bar-links',
  template: `
    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <strong *ngIf="name">{{ name }}&nbsp;&nbsp;</strong>
          <strong *ngIf="role">|&nbsp;&nbsp;{{ role }}&nbsp;&nbsp;</strong>
          <div class="buttons">
            <a class="button is-primary" *ngIf="loggedIn" (click)="logout()">
              <strong>se déconnecter</strong>
            </a>
            <a
              class="button is-primary"
              *ngIf="!loggedIn"
              [routerLink]="['/login']"
            >
              <strong>se connecter</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class HeaderBarLinksComponent {
  loggedIn = false;
  name: string | undefined;
  role: string | undefined;

  constructor(
    public userService: UserService,
    public afAuth: AngularFireAuth,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.user$.subscribe({
      next: (value) => {
        if (value) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      },
      error: (error) => console.error(error.toString()),
    });

    this.authService.currentAccount$.subscribe({
      next: (value) => {
        if (value) {
          this.name = value.name;
          this.role = value.role;
        } else {
          this.name = undefined;
          this.role = undefined;
        }
      },
      error: (error) => console.error(error.toString()),
    });
  }

  logout(): void {
    this.authService.doLogout().then(
      (res) => {
        this.router.navigate(['']);
        console.log('Logout success');
      },
      (error) => {
        console.log('Logout error', error);
      }
    );
  }
}
