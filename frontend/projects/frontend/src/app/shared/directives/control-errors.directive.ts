import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FORM_ERRORS } from '../../core/form-errors';

@Directive({
  selector: 'mat-error[for]',
})
export class ControlErrorsDirective implements OnInit {
  @Input('for') control: AbstractControl | undefined;

  constructor(
    private element: ElementRef,
    @Inject(FORM_ERRORS) private errors: any
  ) {}

  ngOnInit(): void {
    let errorMessage = this.getErrorMessage();
    this.renderErrorMessage(errorMessage);

    this.control?.statusChanges.subscribe(() => {
      errorMessage = this.getErrorMessage();
      this.renderErrorMessage(errorMessage);
    });
  }

  private getErrorMessage(): string {
    let errorMessage = '';

    if (this.control?.invalid && this.control.errors) {
      const firstKey = Object.keys(this.control.errors)[0];
      const getError = this.errors[firstKey];
      errorMessage = getError(this.control.errors[firstKey]);
    }

    return errorMessage;
  }

  private renderErrorMessage(errorMessage: string) {
    this.element.nativeElement.innerText = errorMessage;
  }
}
