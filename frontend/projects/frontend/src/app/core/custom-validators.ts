import { FormArray } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  /**
   * Custom validator to check if a given URL is correctly written.
   */
  static url: ValidatorFn = (control: AbstractControl) => {
    let validUrl = true;

    try {
      new URL(control.value);
    } catch {
      validUrl = false;
    }

    return validUrl ? null : { invalidUrl: true };
  };

  /**
   * Custom validator to check if what the user entered is inside a given list.
   */
  static insideList = (list: string[]): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (list.find((element) => control.value === element)) {
        return null;
      }

      return { insideList: true };
    };
  };

  static atLeastOneCheckboxCheckedValidator(
    minRequired = 1
  ): ValidatorFn {
    return function validate(formArray: AbstractControl) {
      
      if (formArray instanceof FormArray) {
        let checked = 0;
  
        Object.keys(formArray.controls).forEach((key) => {
          const control = (formArray).controls[key as any];
    
          if (control.value) {
            checked++;
          }
        });
    
        if (checked < minRequired) {
          return {
            requireCheckboxToBeChecked: true,
          };
        }
    
        return null;
      }
      else {
        throw new Error('formArray is not an instance of FormArray');
      }
    };
  }
}
