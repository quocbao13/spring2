import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {TokenService} from "../security/login-service/token.service";



@Injectable({
  providedIn: 'root'
})
export class PostService {


  public httpOptions: any;


  private readonly API = 'http://localhost:8080/api/posts';

  private API1 = 'http://localhost:8080/api/posts/';
  private status: boolean;

  private APILIKE = 'http://localhost:8080/api/like';

  constructor(private http: HttpClient,
              private tokenStorage: TokenService) {

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  //phuc k xoa

  listPost(size: number): Observable<any> {
    return this.http.get(this.API + '/list1' + '?size=' + size, this.httpOptions);

  }

  //phuc like
  createLike(idUser:number, idPost:number): Observable<any>{
    return this.http.get(this.APILIKE + '/create?idUser=' + idUser + '&idPost=' + idPost, this.httpOptions);
  }
  deleteLike(id): Observable<any>{
    console.log(this.APILIKE + '/delete/' + id);
    return this.http.get(this.APILIKE + '/delete/' + id, this.httpOptions)
  }
  //

  //Khanh
  savePost(idGroup, idUser, image, content1, status1, date): Observable<any>{

    return this.http.post(this.API + '/savePost', {

      content: content1,
      createDate: date,
      status: status1,
      user: {id: idUser, name: 'abc', password: '123'},
      img: image,
      group: {id: idGroup}
    }, this.httpOptions);
  }
  //Khanh
  findById(Id): Observable<any>{
    return this.http.get(this.API1 + 'findById/' + Id, this.httpOptions);
  }
  //Khanh
  editPost(idUser, idPost, image, content1, status1, date): Observable<any>{
    return this.http.put(this.API1 + 'editPost/' + idPost, {
      content: content1,
      createDate: date,
      status: status1,
      user: {id: idUser, name: 'abc', password: '123'},
      img: image
    }, this.httpOptions);
  }
  //Khanh
  getStatus(){
    return this.status;
  }
  //Khanh
  setStatus(){
    return this.status = true;
  }
}
