import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SignupRequest } from '../../core/services/auth.service';

@Component({
    selector: 'app-user-registration',
    standalone: false,
    templateUrl: './user-registration.html',
    styleUrl: './user-registration.css',
})
export class UserRegistration {
    registerForm: FormGroup;
    errorMessage: string = '';
    showPassword = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            address: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');
        return password && confirmPassword && password.value === confirmPassword.value
            ? null : { mismatch: true };
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.errorMessage = '';
            const formValue = this.registerForm.value;

            const signupRequest: SignupRequest = {
                username: formValue.username,
                email: formValue.email,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                password: formValue.password,
                phoneNumber: formValue.phoneNumber,
                address: formValue.address,
                roles: ['CLIENT'] // Default role
            };

            this.authService.register(signupRequest).subscribe({
                next: () => {
                    // Redirect to login or show success
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    console.error('Registration error', err);
                    this.errorMessage = 'Registration failed. Please try again.';
                }
            });
        } else {
            this.registerForm.markAllAsTouched();
        }
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}
