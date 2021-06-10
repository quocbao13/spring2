import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from '../security/login-service/token.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {
  httpOptions: any;
  private URLFRIEND = 'http://localhost:8080/api/post';

  constructor(private http: HttpClient,
              private tokenStorage: TokenService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  createLikePost(postLike): Observable<any>{
    return this.http.post(this.URLFRIEND , postLike , this.httpOptions)
  }

  deletePostLike(id: number): Observable<any>{
    return this.http.delete(this.URLFRIEND +'/deletePostLike/' + id , this.httpOptions)
  }
}
