import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IProfileDTO} from "./DTO/profile-dto";
import {TokenService} from "../security/login-service/token.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpOptions: any;
  private URLPROFILE = 'http://localhost:8080/api/profile/';



  constructor(private http: HttpClient,private tokenStorage: TokenService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  getByIdAccount(): Observable<any> {
    return this.http.get<any>(this.URLPROFILE +'list-post',this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  getAllPostFriendList(id:number): Observable<any>{
    return this.http.get<any>(this.URLPROFILE +'list-post/'+ id ,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );

  }
  getComment():Observable<any>{
    return this.http.get<any>(this.URLPROFILE + 'comment/',this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getCommentUser(id: number):Observable<any>{
    return this.http.get<any>(this.URLPROFILE + 'comment/' + id ,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }



  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getAllPostAccount(): Observable<any> {
    return this.http.get<any>(this.URLPROFILE + 'list-post', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllimg(id : number): Observable<any> {
    return this.http.get<any>(this.URLPROFILE + 'img/'+ id , this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllimgAccount(): Observable<any> {
    return this.http.get<any>(this.URLPROFILE +'img' , this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
}
