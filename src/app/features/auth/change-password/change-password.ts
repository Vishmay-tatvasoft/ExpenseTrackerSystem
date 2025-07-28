import { Component } from '@angular/core';
import { FieldConfigInterface } from '../../../core/models/field-config.interface';
import { DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';

@Component({
  selector: 'app-change-password',
  imports: [DynamicForm],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword {
  formJson:FieldConfigInterface[] = [
    {
      inputfield : {
        disabled: false,
        label: 'New Password',
        name: 'newPassword',
        placeholder: 'Enter new password',
        type: 'password',
        appearance: 'outline',
        icon: 'visibility',
        toggleIcon: true,
        toggleIcons: ['visibility','visibility_off'],
        toggleTypes: ['password','text'],
        id: 'newPassword'
      }, validators:['required','min:5','missingUpperCase', 'missingLowerCase', 'missingDigit', 'missingSpecialCharacter']
    },
    {
      inputfield : {
        disabled: false,
        label: 'Confirm Password',
        name: 'confirmPassword',
        placeholder: 'Enter confirm password',
        type: 'password',
        appearance: 'outline',
        icon: 'visibility',
        toggleIcon: true,
        toggleIcons: ['visibility','visibility_off'],
        toggleTypes: ['password','text'],
        id: 'confirmPassword',
        matchWith:'newPassword'
      }, validators:['required'], matchesWith:'newPassword'
    }
  ];

  onSubmit(){
    console.log("Hello")
  }
}
