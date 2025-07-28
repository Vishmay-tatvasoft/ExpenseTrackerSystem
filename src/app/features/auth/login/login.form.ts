import { FieldConfigInterface } from "../../../core/models/field-config.interface";

export const loginFormJson:FieldConfigInterface[] = [
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
    }, validators: ['required']
  },
  {
    inputfield: {
      appearance: 'outline',
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
    }, validators: ['required']
  },
  {
    inputfield: {
      name: 'rememberMe',
      label: 'Remember Me',
      type: 'checkbox',
      disabled: false,
      id: 'checkbox',
      appearance: 'outline',
      placeholder: '',
    }
  }
];