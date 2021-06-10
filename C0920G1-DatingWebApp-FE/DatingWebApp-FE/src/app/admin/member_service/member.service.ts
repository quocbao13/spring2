import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MemberDTO} from '../DTO/member-dto';
import {ViolationDTO} from '../DTO/violation-dto';
import {TokenService} from '../../security/login-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  httpOptions: any;

  private readonly API = 'http://localhost:8080/api/member-management';

  constructor(private http: HttpClient,
              private tokenStorage: TokenService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  listMember(size: number): Observable<any> {
    return this.http.get<MemberDTO[]>(this.API + '/list-member' + '?size=' + size, this.httpOptions);
  }

  listMemberByName(userNameSearch: string, size: number): Observable<any> {
    return this.http.get<MemberDTO[]>(this.API + '/list-member-find' + '?userNameSearch=' + userNameSearch + '&size=' + size, this.httpOptions);
  }

  getViolationsByUserId(userId: number): Observable<any> {
    return this.http.get<ViolationDTO[]>(this.API + '/reports/' + userId,this.httpOptions);
  }

  getMemberByUserId(userId: number): Observable<any> {
    return this.http.get<MemberDTO>(this.API + '/member/' + userId,this.httpOptions);
  }

  banAccountForOneWeek(userId: number): Observable<any> {
      return this.http.get(this.API+'/ban-1-week/'+userId,this.httpOptions)
  }
  banAccountForOneMonth(userId: number): Observable<any> {
    return this.http.get<any>(this.API+'/ban-1-month/'+userId,this.httpOptions);
  }
  banAccountForever(userId: number): Observable<any> {
    return this.http.get<any>(this.API+'/ban-forever/'+userId,this.httpOptions);
  }
  warningAccount(userId:number): Observable<any>{
    return this.http.get<any>(this.API+'/warning/'+userId,this.httpOptions);
  }
}
