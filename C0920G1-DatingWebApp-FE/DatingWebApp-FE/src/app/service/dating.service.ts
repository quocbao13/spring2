import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../security/login-service/token.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatingService {
  private readonly URL = 'http://localhost:8080/dating';
  public httpOptions: any;
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getUserRecommendList(): Observable<any> {
    return this.http.get<any>(this.URL + '/show-recommend/' + this.tokenStorage.getUser().id, this.httpOptions);
  }

  getHobbyRecommendList(): Observable<any> {
    return this.http.get<any>(this.URL + '/' + this.tokenStorage.getUser().id, this.httpOptions);
  }

  saveDislike(idLogin): Observable<any> {
    return this.http.post<any>(this.URL + '/save-dislike?idLogin=' + idLogin + '&idDislike=' + this.tokenStorage.getUser().id, this.httpOptions)
  }
}
