import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, forwardRef, inject, Injector, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CustomInputInterface } from '../../../core/models/custom-input.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatCheckbox } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { debounceTime, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-custom-input',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatOptionModule, MatRadioGroup, MatRadioButton, MatCheckbox, CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true
    }
  ],
})
export class CustomInput implements ControlValueAccessor {
  @Input() customInput!: CustomInputInterface;
  @Input() formControl!: FormControl;
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

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.onChange(input.files[0]);
      this.onTouched();
    }
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

  getErrorKeys(): string[] {
    return this.formControl?.errors ? Object.keys(this.formControl.errors) : [];
  }

  getErrorMessage(errorKey: string): string {
    if (this.customErrors && this.customErrors[errorKey]) {
      return this.customErrors[errorKey];
    }

    // fallback defaults
    switch (errorKey) {
      case 'required':
        return `${this.customInput.label} is required.`;
      case 'minlength':
        return `Minimum ${this.formControl?.errors?.['minlength'].requiredLength} characters required.`;
      case 'maxlength':
        return `Maximum ${this.formControl?.errors?.['maxlength'].requiredLength} characters allowed.`;
      case 'email':
        return 'Invalid email.';
      case 'pattern':
        return 'Invalid pattern.';
      case 'usernameTaken':
        return 'Username is already taken.';
      default:
        return 'Invalid field.';
    }
  }



}
