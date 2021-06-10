import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenDto} from './token-dto';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public confirmAccount(token: string): Observable<any> {
    return this.httpClient.get(this.authURL + 'confirm-account' + '?token=' + token, httpOptions);
  }

  login(credentials): Observable<any> {
    return this.httpClient.post(this.authURL + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.httpClient.post(this.authURL + 'signup', {
      email: user.email,
      password: user.password,
      checkPassword: user.checkPassword,
      checkPolicy: user.checkPolicy,
    }, httpOptions);
  }
}
