import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<any> {
    return this.http.get(config.API_URL + '/users');
  }

  public approve(id: any) {
    return this.http.put(config.API_URL + `/users/${id}/approve`, null);
  }

  public blockUnblock(id: any) {
    return this.http.put(config.API_URL + `/users/${id}/block-unblock`, null);
  }

  public changeRole(id: any, request: any) {
    return this.http.put(config.API_URL + `/users/${id}/role`, request);
  }

  public changePermission(id: any, request: any) {
    return this.http.put(config.API_URL + `/users/${id}/permissions`, request);
  }
}
