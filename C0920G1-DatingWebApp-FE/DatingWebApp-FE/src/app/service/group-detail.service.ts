import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../security/login-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class GroupDetailService {

  private urlGroup = 'http://localhost:8080/api/group';
  public httpOptions: any;

  constructor(private http: HttpClient,
              private token: TokenService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.token.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllUserInGroup(id: number): Observable<any> {
    return this.http.get(this.urlGroup + '/' + id + '/member', this.httpOptions);
  }

  getGroupById(id: number): Observable<any> {
    return this.http.get(this.urlGroup + '/' + id, this.httpOptions);
  }

  getAllPostInGroup(id: number): Observable<any> {
    return this.http.get(this.urlGroup + '/' + id + '/post', this.httpOptions);
  }

  outGroup(idUser: number, idGroup: number): Observable<any> {
    return this.http.delete(this.urlGroup + '/' + idGroup + '/out/' + idUser, this.httpOptions);
  }

  joinGroup(idUser: number, idGroup: number): Observable<any> {
    return this.http.post(this.urlGroup + '/' + idGroup + '/join/' + idUser, this.httpOptions);
  }
}
