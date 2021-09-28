import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  ModalOptions,
  ModalService
} from '../../../shared/components/modal/modal.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  private modalOptions: ModalOptions = {
    title: 'Votre session a expiré',
    message:
      "Vous allez être redirigé vers la page d'authentification " +
      'pour vous authentifier à nouveau.',
    confirmText: 'Ok',
    confirmColor: 'primary',
  };

  constructor(
    private router: Router,
    private modalService: ModalService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next
      .handle(req)
      .pipe(catchError((error) => this.handleAuthenticationError(error)));
  }

  private handleAuthenticationError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 && this.isNotLoginUrl(error.url)) {
      this.modalService.open(this.modalOptions);

      return this.modalService
        .confirmed()
        .pipe(map(() => this.router.navigate(['/login'])));
    }
    return throwError(error);
  }

  private isNotLoginUrl(url: string | null) {
    return url && !url.includes(this.authenticationService.loginUrl);
  }
}
