import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services/AuthService/auth.service';
import { TokenService } from '../services/TokenService/token-service.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';


function fourDigitNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return /^\d{4}$/.test(value) ? null : { 'fourDigitNumber': true };
  };
}


@Component({
  selector: 'app-login-verify',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login-verify.component.html',
  styleUrl: './login-verify.component.css'
})
export class LoginVerifyComponent {
  code = new FormControl('', [Validators.required, fourDigitNumberValidator()]);
  form = this.fb.group({ code: this.code });

  constructor(private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService, private snackBar: CustomSnackBarService,
    private router: Router) { }

  onBlur(control: any) {
    control.markAsTouched();
  }

  onSubmit() {
    let tmp = sessionStorage.getItem("FIRST_PART_LOGIN");
    if (tmp) {
      let id = parseInt(tmp);
      let obj = { id: id, code: this.code.value };
      this.authService.finishLogin(obj).subscribe({
        next: (data) => {
          this.tokenService.storeJwt(data.token);
          this.tokenService.storeUser(data);
          sessionStorage.removeItem("FIRST_PART_LOGIN");
          this.router.navigate(['']);

        }, error: (error) => {
          if (error.status == 401 || error.status == 404) {
            this.snackBar.openSnackBar("Verification code is invalid", 'close', false);
          }
          else {
            this.snackBar.openSnackBar(
              'Error communicating with the server',
              'close',
              false
            );
          }
        }
      });
    }
  }
}
