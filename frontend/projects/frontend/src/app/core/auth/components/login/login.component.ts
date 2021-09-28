import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  ButtonDescription,
  ButtonStatus,
  ButtonStyle
} from 'projects/frontend/src/app/shared/components/button-list/button-list.component';
import { AuthenticationService } from '../../services/authentication.service';

enum ButtonTypes {
  LOGIN,
}

@Component({
  selector: 'app-page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  footerButtons: ButtonDescription<ButtonTypes>[] = [];
  error$: any;
  durationInSeconds = 5;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.error$ = this.authenticationService.error$;
    this.error$.subscribe((error: any) => {
      this.snackBar.open(error.title, undefined, {
        duration: this.durationInSeconds * 1000,
        panelClass: ['mat-toolbar', 'mat-warn'],
      });
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeFooterButtons();
  }

  private initializeFooterButtons() {
    this.footerButtons = [
      {
        type: ButtonTypes.LOGIN,
        text: 'Se connecter',
        icon: 'trash-2',
        style: ButtonStyle.FLAT,
        callback: () => {
          this.tryLogin();
        },
      },
    ];
  }

  private updateFooterButtonsStatus(newStatus: ButtonStatus) {
    const saveButton = this.footerButtons.find(
      (button) => button.type === ButtonTypes.LOGIN
    );

    saveButton!.status = newStatus;
  }

  tryLogin(): void {
    this.updateFooterButtonsStatus(ButtonStatus.LOADING);

    this.authenticationService
      .login({
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe(
        () => this.router.navigate(['/references']),
        () => (this.footerButtons = [...this.footerButtons]),
        () => {
          this.updateFooterButtonsStatus(ButtonStatus.ENABLED);
          this.cd.detectChanges();
        }
      );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
}
