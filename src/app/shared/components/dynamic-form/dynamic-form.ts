import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FieldConfigInterface } from '../../../core/models/field-config.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../custom-input/custom-input';
import { CustomButton } from '../custom-button/custom-button';
import { CustomButtonInterface } from '../../../core/models/custom-button.interface';
import { PasswordStrengthValidator } from '../../validators/password-strength.validator';
import { MatchFieldsValidator } from '../../validators/match-fields.validator';
import { MatError } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { encryptedPayload } from '../../utils/encryptedPayload.utility';
import { ToastrService } from 'ngx-toastr';
import { CanDeactivateService } from '../../services/can-deactivate-service';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, CustomInput, CustomButton, MatError],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss'
})
export class DynamicForm implements OnInit, OnDestroy {
  @Input() formJson: FieldConfigInterface[] = [];
  @Input() buttonConfig: CustomButtonInterface = {
    type: 'submit',
    label: 'Submit',
    style: 'success',
    size: 'lg',
    icon: 'send',
    block: true,
    class: 'mt-3',
  };
  @Input() submitFn!: (payload: any) => Observable<any>;
  @Input() excludeFields: string[] = [];
  @Input() additionalFields?: { [Key: string]: any };
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>(); // for routinh navigation after successful submission of data

  form!: FormGroup;
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  canDeactivateService = inject(CanDeactivateService);

  ngOnInit(): void {
    this.form = this.buildForm(this.formJson);
    this.canDeactivateService.register(() => this.canDeactivate());
  }

  ngOnDestroy(): void {
    this.canDeactivateService.clear();
  }

  buildForm(config: FieldConfigInterface[]): FormGroup {
    const group: { [Key: string]: any } = {};
    const matchFields: { field: string; matchesWith: string }[] = [];

    for (let field of config) {
      const validators = this.mapValidators(field.validators!);
      const name = field.inputfield.name;
      const type = field.inputfield.type;
      const value = field.inputfield.value;
      let defaultValue = this.getDefaultValue(type, value);
      group[name] = this.fb.control(defaultValue, validators);

      // Cross Field Validations
      if (field.matchesWith) {
        matchFields.push({ field: field.inputfield.name, matchesWith: field.matchesWith })
      }
    }

    const formGroup = this.fb.group(group);

    for (let match of matchFields) {
      formGroup.addValidators(MatchFieldsValidator(match.matchesWith, match.field));
    }
    return formGroup;
  }

  mapValidators(validators: string[]): any[] {
    const formValidators = [];

    if (validators) {
      for (let val of validators) {
        if (val == 'required') {
          formValidators.push(Validators.required);
        } else if (val == 'email') {
          formValidators.push(Validators.email);
        } else if (val.startsWith('min:')) {
          const valNum = parseInt(val.split(':')[1]);
          formValidators.push(Validators.minLength(valNum));
        } else if (val.startsWith('max:')) {
          const valNum = parseInt(val.split(':')[1]);
          formValidators.push(Validators.max(valNum));
        } else if (val == 'missingUpperCase' || val == 'missingLowerCase' || val == 'missingDigit' || val == 'missingSpecialCharacter') {
          formValidators.push(PasswordStrengthValidator());
        }
      }
    }
    return formValidators;
  }

  canDeactivate(): boolean {
    console.log("Deactivation called");
    if (this.form.dirty && this.form.touched) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.markAsPristine();
      this.form.markAsUntouched();
      const rawData = this.form.value;

      const finalPayload = {
        ...rawData,
        ...(this.additionalFields ?? {})
      }

      const secretKey = environment.secretKey;
      const encryptedKey = encryptedPayload(finalPayload, secretKey, this.excludeFields);
      this.submitFn(encryptedKey).subscribe({
        next: res => {
          this.toastr.success(res.message);
          this.formSubmit.emit(this.form.value);
        },
        error: err => {
          this.toastr.error(err?.error?.message || 'Submission failed');
        }
      });
      console.log("Dynamic form submitted:", this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  get mergedButtonConfig(): CustomButtonInterface {
    return {
      ...this.buttonConfig,
      disabled: this.form?.invalid ?? true, // fallback to true if form not yet initialized
    };
  }

  getDefaultValue(type: string, value: any) {
    if (value !== undefined) return value;

    switch (type) {
      case 'checkbox':
        return false;
      case 'number':
        return 0;
      default:
        return '';
    }
  }

}
