import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);

  loginErrorMessage: string = '';

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if(this.loginForm.valid) {

      const loginRequest: LoginRequest = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!
      }

      this.loginService.login(loginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (error) => {
          console.error(error);
          this.loginErrorMessage = error.message;
        },
        complete: () => {
          this.router.navigate(['/home']);
          this.loginForm.reset();
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
