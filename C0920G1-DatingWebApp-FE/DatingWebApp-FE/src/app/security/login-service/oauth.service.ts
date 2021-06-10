import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenDto} from './token-dto';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  oauthURL = 'http://localhost:8080/oauth/';

  constructor(private httpClient: HttpClient) { }

  public facebook(tokenDto: TokenDto): Observable<any> {
    console.log(tokenDto.value);
    return this.httpClient.post(this.oauthURL + 'facebook', tokenDto, httpOptions);
  }
}
