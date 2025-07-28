import { FieldConfigInterface } from "../../../core/models/field-config.interface";

export const registerationFormJson: FieldConfigInterface[] = [
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