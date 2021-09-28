import { InjectionToken } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export const defaultErrors: ValidationErrors = {
  // For Angular official validators
  required: (error: any) => 'Ce champ est requis',
  minlength: ({ requiredLength, actualLength }: any) =>
    `Ce champ doit faire au minimum ${requiredLength} caractères`,
  maxlength: ({ requiredLength, actualLength }: any) =>
    `Ce champ ne doit pas dépasser ${requiredLength} caractères`,
  email: (error: any) => `Ceci n'est pas un email valide`,
  min: ({ min }: any) => `Ce champ ne doit pas être inférieur à ${min}`,
  max: ({ max }: any) => `Ce champ ne doit pas être supérieur à ${max}`,
  invalidUrl: () =>
    'Entrez une URL valide. Example : https://www.url-valide.com/',

  // For custom validators
  insideList: () => 'Sélectionnez une option parmis celles suggérées',
  requireCheckboxToBeChecked: () => 'Veuillez cocher au moins une case',
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});
