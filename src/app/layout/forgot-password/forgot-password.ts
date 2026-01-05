import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-forgot-password',
    standalone: false,
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.css',
})
export class ForgotPassword {
    forgotPasswordForm: FormGroup;
    message: string = '';
    isError: boolean = false;
    isSuccess: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.forgotPasswordForm = this.fb.group({
            identifier: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.forgotPasswordForm.valid) {
            this.message = '';
            this.isError = false;
            this.isSuccess = false;

            const identifier = this.forgotPasswordForm.get('identifier')?.value;
            const isEmail = identifier.includes('@');
            const payload = isEmail ? { email: identifier } : { username: identifier };

            this.authService.recoverPassword(payload).subscribe({
                next: () => {
                    this.isSuccess = true;
                    this.message = 'If an account exists, instructions have been sent to your email.';
                    this.forgotPasswordForm.reset();
                },
                error: (err) => {
                    console.error('Recovery error', err);
                    this.isError = true;
                    this.message = 'Unable to process request. Please try again.';
                }
            });
        } else {
            this.forgotPasswordForm.markAllAsTouched();
        }
    }
}
