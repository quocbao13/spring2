import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../security/login-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly API = 'http://localhost:8080/api/comments';
  private httpOptions: any;
  constructor(private http: HttpClient, private tokenStorage: TokenService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  createComment(comment: Object, idPost:any, idUser: any): Observable<Object>{
    return this.http.post(this.API + '/create?idPost='+idPost + '&idUser='+idUser, comment ,this.httpOptions );
  }

  getCommentId(id): Observable<any>{
    return this.http.get(this.API + '/' + id, this.httpOptions);
  }

  updateCommentById(id, value, idPost): Observable<Object>{
    let token = this.tokenStorage.getUser().id;
    return this.http.put(this.API + '/edit/' + id + '?idPost=' + idPost + '&idUser='+ token, value, this.httpOptions)
  }

  deleteComment(id): Observable<any>{
    return this.http.delete(this.API + '/delete/' + id, this.httpOptions);
  }

  createCommentParent(comment: Object, idPost:any, idUser:any, idComment:any): Observable<Object>{
    return this.http.post(this.API + '/create_parent?idPost=' + idPost + '&idUser=' + idUser + '&idComment=' + idComment,
      comment, this.httpOptions)
  }

  updateCommentParentById(id, value, idPost, idComment): Observable<Object>{
    let token = this.tokenStorage.getUser().id;
    return this.http.put(this.API + '/edit/' + id + '?idPost=' + idPost + '&idUser='+ token + '&idComment' + idComment, value, this.httpOptions)
  }

}
