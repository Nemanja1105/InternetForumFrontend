import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { TokenService } from '../services/TokenService/token-service.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { config } from '../config/config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink, RouterLinkActive, MatTooltipModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: CustomSnackBarService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  username = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);
  password = new FormControl('', [Validators.required]);
  remember = new FormControl(false);
  loginForm = this.fb.group({
    username: this.username,
    password: this.password,
  });

  ngOnInit() {
    sessionStorage.removeItem("FIRST_PART_LOGIN");
    const rememberedUsername = localStorage.getItem('remember');
    if (rememberedUsername) {
      this.loginForm.patchValue({
        username: rememberedUsername,
      });
      this.remember.setValue(true);
    }
  }

  onBlur(control: any) {
    control.markAsTouched();
  }

  signInWithGitHub() {
    window.location.href = config.GITHUB_OAUTH2();
  }

  onSubmit() {
    this.authService
      .login({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe({
        next: (data) => {
          if (this.remember.value && this.username.value) {
            localStorage.setItem('remember', this.username.value);
          } else localStorage.removeItem('remember');
          sessionStorage.setItem("FIRST_PART_LOGIN", data);
          this.snackBar.openSnackBar("Please check your inbox", "close", true);
          this.router.navigate(['/login-verify']);
        },
        error: (error) => {
          if (error.status === 401 || error.status == 403) {
            this.snackBar.openSnackBar(
              'Incorrect username or password. Please try again.',
              'close',
              false
            );
          } else if (error.status === 404) {
            this.snackBar.openSnackBar(
              'The account is blocked. Contact the administrator.',
              'close',
              false
            );
          } else if (error.status === 406) {
            //The user account is not activated, wait for the administrator to approve the account
            this.snackBar.openSnackBar(
              'Your account is not activated',
              'close',
              false
            );
          } else {
            this.snackBar.openSnackBar(
              'Error communicating with the server',
              'close',
              false
            );
          }
        },
      });
  }

}
