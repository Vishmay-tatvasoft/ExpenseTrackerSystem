import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environment/environment';
import { encryptedPayload } from '../../../shared/utils/encryptedPayload.utility';
import { OtpVerificationService } from '../../../core/services/auth/otp-verification';
import { ForgotPasswordService } from '../../../core/services/auth/forgot-password';

@Component({
  selector: 'app-otp-verification',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './otp-verification.html',
  styleUrl: './otp-verification.scss'
})
export class OtpVerification implements AfterViewInit{

  @ViewChildren('otpInput') otpInputFields!: QueryList<ElementRef>;
  @ViewChild('resendCodeBtn') resendCodeBtn!: ElementRef<HTMLButtonElement>;
  otpInputs = Array(6).fill(0);
  otp: string[] = ['', '', '', '', '', ''];
  cooldownTimer: any;
  verifying = false;
  resendDisabled = false;
  resendCooldown = 60;
  resendButtonText = 'Resend Code';
  toastr = inject(ToastrService);
  http = inject(HttpClient);
  router = inject(Router);
  optVerificationService = inject(OtpVerificationService);
  forgotPasswordService = inject(ForgotPasswordService);
  userEmail = this.router.getCurrentNavigation()?.extras?.state?.['email'] ?? localStorage.getItem('resetEmail') ?? '';


  ngAfterViewInit() {
    this.focusInput(0);
  }

  focusInput(index: number) {
    const field = this.otpInputFields.toArray()[index];
    if (field) field.nativeElement.focus();
  }

  onInput(event: any, index: number) {
    const input = event.target.value;
    if (input.length === 1 && index < 5) this.focusInput(index + 1);
    if (!input) this.focusInput(index - 1);
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text')?.trim();
    if (pasted?.length === 6) {
      this.otp = pasted.split('');
      setTimeout(() => this.focusInput(5), 50);
    } else {
      this.toastr.error('Please paste a valid 6-digit code');
    }
  }

  verifyOtp() {
    const otpCode = this.otp.join('');
    if (otpCode.length !== 6) {
      this.toastr.error('Please enter all 6 digits');
      return;
    }

    this.verifying = true;
    debugger;
    const secretKey = `${environment.secretKey}`;
    const encrypted = encryptedPayload({ emailAddress:this.userEmail, OTP: otpCode }, secretKey);
    this.optVerificationService.verifyOTP(encrypted).subscribe({
      next: res => {
        debugger;
        console.log(res);
        if(res.statusCode == 200){
          this.toastr.success(res.message);
          this.router.navigate(['/auth/change-password']);
        }else{
          this.toastr.error(res.message);
        }
        this.verifying = false;
      },
      error: err => {
        err = err.error;
        if(err.statusCode == 400){
          this.toastr.error(err.message);
        }else if(err.statusCode == 500){
          this.toastr.error(err.message);
        }else{
          this.toastr.error('Something went wrong, Please try again!');
        }
        this.verifying = false;
      }
    })
  }

  resendOtp() {
    this.resendDisabled = true;
    const secretKey = `${environment.secretKey}`;
    const encrypted = encryptedPayload({ emailAddress : this.userEmail}, secretKey);
    this.forgotPasswordService.forgotpassword(encrypted).subscribe({
      next: res => {
        this.toastr.success(res.message);
        this.startResendCooldown();
      },
      error: err => {
        this.toastr.error('Failed to resend code');
        this.resendDisabled = false;
      }
    });
  }

  startResendCooldown() {
    let countdown: number = this.resendCooldown as number;
    const button = this.resendCodeBtn.nativeElement;
    button.disabled = true;

    button.textContent = `Resend Code (${countdown}s)`;

    this.cooldownTimer = setInterval(() => {
      countdown--;
      button.textContent = `Resend Code (${countdown}s)`;
      if (countdown <= 0) {
        clearInterval(this.cooldownTimer);
        button.disabled = false;
        button.textContent = 'Resend Code';
      }
    }, 1000);
  }
}
