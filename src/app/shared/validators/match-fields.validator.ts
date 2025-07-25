import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MatchFieldsValidator(field1: string, field2: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control1 = group.get(field1);
    const control2 = group.get(field2);

    if (!control1 || !control2) return null;

    return control1.value === control2.value ? null : { fieldsMismatch: { message: `${field1} and ${field2} do not match`, field1, field2 } };
  }
}