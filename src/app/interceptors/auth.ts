import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/TokenService/token-service.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);
    const token = tokenService.getJwt();
    if (token) {
        req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
        });
    }
    return next(req).pipe(
        tap((event) => {
            if (event.type === HttpEventType.Response) {
                if ((event.status === 401 && !event.url?.includes('/auth')) || event.status === 400) {
                    console.log(event.status);
                    tokenService.logout();
                    router.navigate(['/login']);

                }
            }
        })
    );
};
