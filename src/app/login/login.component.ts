import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { TokenService } from '../services/TokenService/token-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink, RouterLinkActive],
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
          this.tokenService.storeJwt(data.token);
          this.tokenService.storeUser(data);
          this.router.navigate(['']);
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
              'The user account is not activated, please check your inbox',
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
