import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FieldConfigInterface } from '../../../core/models/field-config.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../custom-input/custom-input';
import { CustomButton } from '../custom-button/custom-button';
import { CustomButtonInterface } from '../../../core/models/custom-button.interface';
import { PasswordStrengthValidator } from '../../validators/password-strength.validator';
import { MatchFieldsValidator } from '../../validators/match-fields.validator';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, CustomInput, CustomButton, MatError],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss'
})
export class DynamicForm implements OnInit {
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
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form!: FormGroup;
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.buildForm(this.formJson);
  }

  buildForm(config: FieldConfigInterface[]): FormGroup {
    const group: { [Key: string]: any } = {};
    const matchFields: { field: string; matchesWith: string }[] = [];

    for (let field of config) {
      const validators = this.mapValidators(field.validators!);
      group[field.inputfield.name] = this.fb.control(field.inputfield.value || '', validators);
    }

    return this.fb.group(group);
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

  onSubmit() {
    if (this.form.valid) {
      console.log("Form value on dynamic form submit:",this.form.value);
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

}
