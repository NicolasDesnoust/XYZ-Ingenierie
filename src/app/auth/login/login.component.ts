import { Component } from '@angular/core';

import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {
  private email: string;
  private password: string;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryLogin() {
    console.log('email:');
    console.log(this.email);
    this.authService.doLogin(this.email, this.password)
    .then(res => {
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }
}
