import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FieldConfigInterface } from '../../../core/models/field-config.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../custom-input/custom-input';
import { CustomButton } from '../custom-button/custom-button';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, CustomInput, CustomButton],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss'
})
export class DynamicForm implements OnInit{
  @Input() formJson: FieldConfigInterface[] = [];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form!:FormGroup;
  fb=inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.buildForm(this.formJson);
  }

  buildForm(config:FieldConfigInterface[]) :FormGroup {
    const group: { [Key:string]: any } = {};

    for(let field of config) {
      const validators = this.mapValidators(field.validators!);
      const name = field.inputfield.name;
      const type = field.inputfield.type;
      const value = field.inputfield.value;
      let defaultValue = this.getDefaultValue(type, value);
      group[name] = this.fb.control(defaultValue, validators);
    }

    return this.fb.group(group);
  }

  mapValidators(validators: string[]): any[]{
    const formValidators = [];

    if(validators){
      for(let val of validators){
        if(val == 'required'){
          formValidators.push(Validators.required);
        } else if(val == 'email'){
          formValidators.push(Validators.email);
        } else if(val.startsWith('min:')){
          const valNum = parseInt(val.split(':')[1]);
          formValidators.push(Validators.min(valNum));
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

  getDefaultValue(type:string, value:any){
    if(value !== undefined) return value;

    switch(type) {
      case 'checkbox':
        return false;
      case 'number':
        return 0;
      default:
        return '';
    }
  }

}
