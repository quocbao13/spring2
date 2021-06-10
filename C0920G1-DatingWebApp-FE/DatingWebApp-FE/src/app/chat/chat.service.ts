import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private API_LIST = 'http://localhost:8080/api/chatroom/list';
  private API_USER = 'http://localhost:8080/api/chatroom/user';

  constructor(private http: HttpClient) {
  }

  getAllChatRoom():Observable<any> {
    return this.http.get(this.API_LIST);
  }

  getListUser():Observable<any> {
    return this.http.get(this.API_USER);
  }
}
