import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';

@Component({
  selector: 'app-header-bar-links',
  templateUrl: './header-bar-links.component.html',
})
export class HeaderBarLinksComponent {
  loggedIn$: Observable<boolean | undefined>;
  name: string | undefined;
  role: string | undefined;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loggedIn$ = this.authService.authenticated;
  }

  logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
