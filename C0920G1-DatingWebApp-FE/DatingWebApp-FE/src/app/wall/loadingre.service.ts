import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../security/login-service/token.service";

@Injectable({
  providedIn: 'root'
})
export class LoadResourceService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ` + this.tokenStorage.getToken() })
    , 'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private http: HttpClient,
              private tokenStorage: TokenService) { }



  loadCss(src) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(css);
    css.href = src;
  }
  loadScript(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(script);
    script.src = src;
  }

}
