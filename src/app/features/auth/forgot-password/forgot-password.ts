import { Component, computed, inject, signal } from '@angular/core';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomButton } from '../../../shared/components/custom-button/custom-button';
import { RouterLink } from '@angular/router';
import { CustomButtonInterface } from '../../../core/models/custom-button.interface';
import { ForgotPasswordService } from '../../../core/services/auth/forgot-password';
import { environment } from '../../../environment/environment';
import { encryptedPayload } from '../../../shared/utils/encryptedPayload.utility';

@Component({
  selector: 'app-forgot-password',
  imports: [CustomInput, CustomButton, RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  forgotPasswordForm!: FormGroup;
  forgotPasswordService = inject(ForgotPasswordService);

  forgotPasswordButtonConfig:CustomButtonInterface = {
    size:'lg',
    label:'submit',
    ariaLabel:'Submit',
    block:true,
    class:'btn btn-success',
    icon:'send',
    type:'submit',
    loading:false,
    disabled:true
  }
  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = fb.group({
      emailAddress: fb.control('',[Validators.required, Validators.email])
    });
    
    // when form status changes
    this.forgotPasswordForm.statusChanges.subscribe(() => {
      this.forgotPasswordButtonConfig.disabled = this.forgotPasswordForm.invalid;
    });
  }



  getFormControl(name: string): FormControl {
    return this.forgotPasswordForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;
    debugger;
    this.forgotPasswordButtonConfig.loading = true;
    const secretKey = `${environment.secretKey}`;
    const encrypted = encryptedPayload(this.forgotPasswordForm.value, secretKey);
    this.forgotPasswordService.forgotpassword(encrypted).subscribe({
      next:(res) => {
        this.forgotPasswordButtonConfig.loading = false;
        console.log("res:",res);
      },
      error:(err)=>{
        this.forgotPasswordButtonConfig.loading = false;
        console.error("error:",err);
      }
    });


  }

}
