import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}'),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
    Validators.email,
  ]);
  name = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  surname = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  usernameValid = true;
  emailValid = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: CustomSnackBarService, private router: Router) {
    sessionStorage.removeItem("FIRST_PART_LOGIN");
  }

  onBlur(control: any) {
    control.markAsTouched();
  }

  profileForm = this.fb.group({ username: this.username, password: this.password, name: this.name, surname: this.surname, email: this.email })

  onBlurUsername() {
    this.username.markAsTouched();
    if (this.username.valid) {
      this.authService
        .checkDetail({ column: 'username', value: this.username.value })
        .subscribe({
          next: (response) => {
            this.usernameValid = !response;
          },
          error: () => {
            this.snackBar.openSnackBar(
              'Error communicating with the server',
              'close',
              false
            );
          },
        });
    }
  }

  onBlurEmail() {
    this.email.markAsTouched();
    if (this.email.valid) {
      this.authService
        .checkDetail({ column: 'email', value: this.email.value })
        .subscribe({
          next: (response) => {
            this.emailValid = !response;
          },
          error: () => { },
        });
    }
  }

  registerClient() {
    let obj = this.profileForm.value;
    this.authService.register(obj).subscribe({
      next: () => {
        this.snackBar.openSnackBar('Registration successful', 'close', true);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      },
    });
  }


}
