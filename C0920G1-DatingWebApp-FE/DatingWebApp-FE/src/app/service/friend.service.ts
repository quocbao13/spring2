import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IFriendDTO} from '../friend/ifriend-dto';
import {TokenService} from '../security/login-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  httpOptions: any;
  private URLFRIEND = 'http://localhost:8080/api';


  constructor(private http: HttpClient,
              private tokenStorage: TokenService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  // *******************************Của hưng************************************************
  getByIdFriend(id: number , page: number): Observable<any> {
    return this.http.get(this.URLFRIEND + '/getMutual?id=' + id + '&page=' + page, this.httpOptions);
  }

  getAccountById(id: number): Observable<any> {
    return this.http.get<IFriendDTO>(this.URLFRIEND + '/profile/'+id+'/friend', this.httpOptions);
  }

  delFriend(userID, friendID): Observable<any> {
    return this.http.get<IFriendDTO>(this.URLFRIEND + '/del-friend-request?UserID=' + userID + '&FriendID=' + friendID , this.httpOptions);
  }

  getAccountInformation(userID): Observable<any> {
    return this.http.get<IFriendDTO>(this.URLFRIEND + '/getAccountInformation/' + userID, this.httpOptions);
  }

  getSuggestionToMakeFriends(userID): Observable<any> {
    return this.http.get<IFriendDTO[]>(this.URLFRIEND + '/general-friend/' + userID, this.httpOptions);
  }

  blockFriend(userID, friendID): Observable<any> {
    return this.http.get<IFriendDTO>(this.URLFRIEND + '/block-friend?UserID=' + userID + '&FriendID=' + friendID , this.httpOptions);
  }
  //**********************Hết*******************************************
  /////////////Duong Nguyen Bao////////////
  // Send friend request
  addFriend(userId: number, friendId: number): Observable<any> {
    return this.http.get(this.URLFRIEND + '/' + userId + '/add-friend/' + friendId, this.httpOptions);
  }
  // Show friend request list
  showFriendRequestList(id: number, loaded: number): Observable<any> {
    return this.http.get(this.URLFRIEND + '/' + id + '/friend-request-list?loaded=' + loaded, this.httpOptions);
  }
  // Count amount of friend request
  countFriendRequest(id: number): Observable<any> {
    return this.http.get(this.URLFRIEND + '/' + id + '/amount-friend-request', this.httpOptions);
  }
  // Delete friend request
  deleteFriendRequest(userId: number, friendId: number): Observable<any> {
    return this.http.get(this.URLFRIEND + '/' + userId + '/delete-friend-request/' + friendId, this.httpOptions);
  }
  // Confirm friend
  confirmFriend(userId: number, friendId: number): Observable<any> {
    return this.http.get(this.URLFRIEND + '/' + userId + '/confirm-friend/' + friendId, this.httpOptions);
  }
  // Check status
  getStatusId(userId: number, friendId: number): Observable<any> {
    return this.http.get(this.URLFRIEND + '/' + userId + '/relationship-status/' + friendId, this.httpOptions);
  }
  // Show friend notification
  showFriendRequestNotification(id: number): Observable<any> {
    return this.http.get(this.URLFRIEND + '/' + id + '/friend-request-notification', this.httpOptions);
  }
  // Lấy user để test
  getUser(id: number): Observable<any> {
    return this.http.get(this.URLFRIEND + '/' + id, this.httpOptions);
  }
  //////////The End///////////////////////

  searchByName(fullName: string): Observable<any>{
    return this.http.get<IFriendDTO>(this.URLFRIEND + '/search?fullName=' + fullName)
  }
}
