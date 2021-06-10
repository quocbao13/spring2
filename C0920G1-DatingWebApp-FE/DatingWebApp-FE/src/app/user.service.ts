import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokenService} from './security/login-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API = 'http://localhost:8080/api/profile/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + this.tokenStorage.getToken()
    })
    , 'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };


  constructor(private http: HttpClient,
              private tokenStorage: TokenService) {
  }

  //API trang
  setupStatusUserSetting(id: number, data: string) {
    return this.http.put(this.API + 'setupStatusUserSetting/' + id, data, this.httpOptions);
  }

  setupStatus(id: number, data: string) {
    return this.http.put(this.API + 'setupStatus/' + id, data, this.httpOptions);
  }

  getStatusUserSetting(id: number) {
    return this.http.get(this.API + 'getStatusUserSetting/' + id, this.httpOptions);
  }

  changePass(id: number, password: string) {
    return this.http.put(this.API + 'changePass/' + id, password, this.httpOptions);
  }
}

//API trang
