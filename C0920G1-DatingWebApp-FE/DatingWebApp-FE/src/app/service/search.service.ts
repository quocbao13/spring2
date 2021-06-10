import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../security/login-service/token.service";
import {UserAdvancedDTO} from "../search/userAdvancedDTO";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private listUer = 'http://localhost:8080/api/search/list-user';
  private listUerAndGroup = 'http://localhost:8080/api/search/list-user-group';
  private listGroup = 'http://localhost:8080/api/search/list-group';
  private listUserAdvanced = 'http://localhost:8080/api/search/list-user-advanced'
  public API = 'http://localhost:8080/api/profile';

  public httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllUserByName(name: string, page: number): Observable<any> {
    return this.httpClient.get(this.listUer + "?name=" + name + "&page=" + page, this.httpOptions)
  }

  getAllUserAndGroupByName(name: string, page: number): Observable<any> {
    return this.httpClient.get(this.listUerAndGroup + "?name=" + name + "&page=" + page, this.httpOptions)
  }

  getAllGroupByName(name: string, page: number): Observable<any> {
    return this.httpClient.get(this.listGroup + "?name=" + name + "&page=" + page, this.httpOptions)
  }

  getAllHobby(): Observable<any> {
    return this.httpClient.get(this.API + '/hobby', this.httpOptions);
  }

  getAllProvince(): Observable<any> {
    return this.httpClient.get(this.API + '/province', this.httpOptions);
  }

  searchAdvance(userAdvancedDTO: UserAdvancedDTO, page:number): Observable<any> {
    return this.httpClient.get(this.listUserAdvanced + "?name=" + userAdvancedDTO.name +
      "&gender=" + userAdvancedDTO.gender +
      "&address=" + userAdvancedDTO.address +
      "&job=" + userAdvancedDTO.job +
      "&startAge=" + userAdvancedDTO.startAge +
      "&endAge=" + userAdvancedDTO.endAge +
      "&hobby=" + userAdvancedDTO.hobby +
      "&page=" + page, this.httpOptions)
  }
 }
