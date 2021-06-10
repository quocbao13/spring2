import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../model/group";
import {TokenService} from "../security/login-service/token.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private url_group = 'http://localhost:8080/group';

  private httpOptions: any;

  constructor(private http: HttpClient, private tokenStorage: TokenService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }


  getAllGroupByName(inputSearch: string, size: number): Observable<any>{
    return this.http.get(this.url_group +'/list' +'/'+ '?inputSearch=' + inputSearch + '&size=' + size,this.httpOptions);
  }

  createGroup(id, name, backgroundGroup): Observable<any>{
    return this.http.post(this.url_group + '/add/' + id,{
      name: name,
      backgroundGroup: backgroundGroup
    },this.httpOptions);
  }

  getFriendById(id): Observable<any>{
    return this.http.get(this.url_group + '/profile/' + id + '/list',this.httpOptions);
  }

  getAllGroup(page: number, size: number): Observable<any> {
    return this.http.get(this.url_group + '/list' + '?page=' + page + '&size=' + size, this.httpOptions);
  }

  deleteGroup(id): Observable<any> {
    return this.http.get(this.url_group + '/delete/' + id,this.httpOptions);
  }

  getGroupById(id): Observable<any>{
    return this.http.get<Group>(this.url_group + '/' + id,this.httpOptions)
  }

}
