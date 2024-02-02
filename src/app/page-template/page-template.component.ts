import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { TokenService } from '../services/TokenService/token-service.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [MatTooltip, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './page-template.component.html',
  styleUrl: './page-template.component.css'
})
export class PageTemplateComponent {

  user: any = null;
  constructor(private tokenService: TokenService, private router: Router) {
    this.user = tokenService.getUser();
  }

  logClick() {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }
}
