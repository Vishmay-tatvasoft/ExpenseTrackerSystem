import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordStrengthValidator() : ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if(!value) return null;

    const errors: any = {};

    if(!/[A-Z]/.test(value)) errors.missingUpperCase = true;
    if(!/[a-z]/.test(value)) errors.missingLowerCase = true;
    if(!/[0-9]/.test(value)) errors.missingDigit = true;
    if(!/[!@#$%^&*(),.?'':{}|<>]/.test(value)) errors.missingSpecialCharacter = true;

    return Object.keys(errors).length > 0 ? errors : null;
  }
}