import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomInputInterface } from '../../../core/models/custom-input.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioButton } from '@angular/material/radio';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-custom-input',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatOptionModule, MatRadioButton, MatCheckbox],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true
    }
  ]
})
export class CustomInput implements ControlValueAccessor {
  @Input() customInput!: CustomInputInterface;
  @Input() customErrors?: { [Key: string]: string };
  @Output() valueChange = new EventEmitter<string>();

  toggleIndex: number = 0;

  onChange = (value: any) => { };
  onTouched = () => { };

  writeValue(obj: any): void {
    this.customInput.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.customInput.disabled = isDisabled
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.customInput.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }
  onSelect(event: MatSelectChange): void {
    this.customInput.value = event.value;
    this.onChange(event.value);
    this.valueChange.emit(event.value);
  }


  toggleIcon(): void {
    if (!this.customInput.toggleIcon || !this.customInput.toggleIcons?.length) return;

    // Cycle toggle index
    this.toggleIndex = (this.toggleIndex + 1) % this.customInput.toggleIcons.length;

    // Set new icon
    this.customInput.icon = this.customInput.toggleIcons[this.toggleIndex];

    // Set new type if toggleTypes are provided
    if (this.customInput.toggleTypes?.length) {
      this.customInput.type = this.customInput.toggleTypes[this.toggleIndex];
    }

  }



}
