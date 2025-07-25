import { Component, inject } from '@angular/core';
import { FieldConfigInterface } from '../../../core/models/field-config.interface';
import { DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';
import { SignUpInterface } from '../../../core/models/sign-up.interface';
import { RouterLink } from '@angular/router';
import { CustomButtonInterface } from '../../../core/models/custom-button.interface';
import { environment } from '../../../environment/environment';
import { encryptedPayload } from '../../../shared/utils/encryptedPayload.utility';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [DynamicForm, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  http = inject(HttpClient);
  formJson: FieldConfigInterface[] = [
    {
      inputfield: {
        type: 'text',
        label: 'Username',
        placeholder: 'Enter your name',
        id: 'username',
        name: 'name',
        icon: 'person',
        disabled: false,
      }, validators: ['required']
    },
    {
      inputfield: {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        id: 'email',
        name: 'emailAddress',
        icon: 'email',
        hint: 'xyz123@gmail.com',
        disabled: false,
      }, validators: ['required', 'email']
    },
    {
      inputfield: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        id: 'password',
        name: 'password',
        icon: 'visibility',
        disabled: false,
        toggleIcon: true,
        toggleTypes: ['password', 'text'],
        toggleIcons: ['visibility', 'visibility_off']
      }, validators: ['required', 'min:5', 'missingUpperCase', 'missingLowerCase', 'missingDigit', 'missingSpecialCharacter']
    },
    {
      inputfield: {
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Enter your confirm password',
        id: 'confirmPassword',
        name: 'confirmPassword',
        icon: 'visibility',
        disabled: false,
        toggleIcon: true,
        toggleTypes: ['password', 'text'],
        toggleIcons: ['visibility', 'visibility_off'],
        matchWith: 'password'
      }, validators: ['required'], matchesWith: 'password'
    },
  ]

  buttonConfig: CustomButtonInterface = {
    type: 'submit',
    label: 'Register',
    style: 'primary',
    size: 'lg',
    icon: '',
    block: true,
    class: 'mt-3',
  }

  onDynamicFormSubmit(formData: SignUpInterface): void {
    const secretKey = `${environment.secretKey}`;
    const encrypted = encryptedPayload(formData, secretKey, ['confirmPassword']);
    this.http.post(`${environment.apiURI}/Auth/register`,JSON.stringify(encrypted),{
      headers: { 'Content-Type': 'application/json' },
    }).subscribe({
      next:(res) => {
        console.log("res:",res);
      },
      error:(err)=>{
        console.error("error:",err);

      }
    });
    console.log("Sign up values : ", formData);
    console.log("Encrypted Payload : ", encrypted);
  }
}
