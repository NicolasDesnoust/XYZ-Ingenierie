import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss'],
})
export class LoginComponent {
  private email = '';
  private password = '';
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  tryLogin(): void {
    console.log('email:');
    console.log(this.email);
    this.authService.doLogin(this.email, this.password).then(
      (res) => {
        this.router.navigate(['/references/show']);
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }
}
