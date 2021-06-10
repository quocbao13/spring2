import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  checkLogout = false;
  private roles: Array<string> = [];

  constructor() { }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public setToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public  saveUser(user): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  logOut(): any {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (window.localStorage.getItem(TOKEN_KEY)) {
      console.log(JSON.parse(window.localStorage.getItem(USER_KEY)).roles[0]);
      JSON.parse(window.localStorage.getItem(USER_KEY)).roles.forEach(authority => {
        this.roles.push(authority);
      });
    }
    return this.roles;
  }
}
