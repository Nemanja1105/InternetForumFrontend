import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() { }

  public logout() {
    //window.localStorage.clear();
    sessionStorage.removeItem(config.JWT_KEY);
    sessionStorage.removeItem(config.USER_KEY);
  }

  public storeJwt(jwtToken: string) {
    sessionStorage.removeItem(config.JWT_KEY);
    sessionStorage.setItem(config.JWT_KEY, jwtToken);
  }

  public getJwt(): string | null {
    return sessionStorage.getItem(config.JWT_KEY);
  }

  public isLoggin(): boolean {
    return this.getUser() !== null && !this.isSessionExspired();
  }

  public decodeToken(): any {
    const token = this.getJwt();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  public isSessionExspired() {
    let token = this.decodeToken();
    let exp = token ? token.exp : null;
    if (exp) {
      return 1000 * exp - new Date().getTime() < 5000;
    } else return false;
  }

  public storeUser(user: any) {
    sessionStorage.removeItem(config.USER_KEY);
    sessionStorage.setItem(config.USER_KEY, JSON.stringify(user));
  }

  public updateUser(updated: any) {
    let user = this.getUser();
    user.name = updated.name;
    user.surname = updated.surname;
    user.city = updated.city;
    user.profileImageId = updated.profileImageId;
    this.storeUser(user);
  }

  public getUser(): any {
    const user = sessionStorage.getItem(config.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
