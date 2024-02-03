import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';
import { TokenService } from '../services/TokenService/token-service.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService, private tokenService: TokenService, private router: Router, private snackBar: CustomSnackBarService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    this.authService.loginWithGithub(code).subscribe({
      next: (data) => {
        this.tokenService.storeJwt(data.token);
        this.tokenService.storeUser(data);
        this.router.navigate(['']);
      }, error: (error) => {
        if (error.status === 404) {
          this.snackBar.openSnackBar(
            'The account is blocked. Contact the administrator.',
            'close',
            false
          );
          this.router.navigate(['']);
        }
        else {
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
          this.router.navigate(['']);
        }
      }
    })
  }

}
