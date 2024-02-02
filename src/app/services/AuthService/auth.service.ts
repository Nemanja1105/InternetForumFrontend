import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(request: any) {
    return this.http.post(config.API_URL + '/auth/register', request);
  }

  public checkDetail(request: any) {
    return this.http.post(config.API_URL + '/auth/check-details', request);
  }

  public login(request: any): Observable<any> {
    return this.http.post(config.API_URL + '/auth/login', request);
  }

  public finishLogin(request: any): Observable<any> {
    return this.http.post(config.API_URL + "/auth/finish-login", request);
  }



}
