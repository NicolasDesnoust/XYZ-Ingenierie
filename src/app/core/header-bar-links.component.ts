import { Account } from './model/account';
import { UserService } from './../auth/user.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AccountService } from '../accounts/account.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-bar-links',
  template: `
    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <strong *ngIf="name" >{{name}}&nbsp;&nbsp;</strong>
          <strong *ngIf="role">|&nbsp;&nbsp;{{role}}&nbsp;&nbsp;</strong>
          <div class="buttons">
            <a class="button is-primary" *ngIf="loggedin" (click)="logout()" >
            <strong>se déconnecter</strong>
            </a>
            <a class="button is-primary" *ngIf="!loggedin" [routerLink]="['/login']" >
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
    `
  ]
})
export class HeaderBarLinksComponent {
  private loggedin: boolean;
  private name: string;
  private role: string;

  constructor(
    public userService: UserService,
    public afAuth: AngularFireAuth,
    private accountService: AccountService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.user$.subscribe({
      next: value => {
        if (value) {
          this.loggedin = true;
        } else {
          this.loggedin = false;
        }
      },
      error: error => console.error(error.toString())
    });

    this.authService.currentAccount$.subscribe({
      next: value => {
        if (value) {
          this.name = value.name;
          this.role = value.role;
        } else {
          this.name = undefined;
          this.role = undefined;
        }
      },
      error: error => console.error(error.toString())
  });
  }

  logout() {
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['']);
      console.log('Logout success');
    }, (error) => {
      console.log('Logout error', error);
    });
  }
}
