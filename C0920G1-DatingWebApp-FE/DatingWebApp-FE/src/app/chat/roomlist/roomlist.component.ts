import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase';
import {DatePipe} from '@angular/common';
import {TokenService} from '../../security/login-service/token.service';
import {OauthService} from '../../security/login-service/oauth.service';
import {FacebookLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {TokenDto} from '../../security/login-service/token-dto';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Subscription} from 'rxjs';
import {DataService} from '../../service/data.service';
import {NotificationService} from "../../service/notification.service";
import {HeaderComponent} from "../../header/header.component";


// ChienTM
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];
  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent implements OnInit {
  message1: string;
  subscription: Subscription;
  checkLogin = false;
  public formGroupName: any;
  nickname = '';
  groupName = '';
  friend: any[];
  idFriend: any;
  id = '';
  displayedColumns: string[] = ['roomname'];
  rooms = [];
  members = [];
  isLoadingResults = true;
  socialUser: SocialUser;
  isCreateGroupChat = false;
  isAddMember = false;
  //chatroom
  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;
  ref = firebase.database().ref('chats/');
  refNotification = firebase.database().ref('notifications/');
  chatForm: FormGroup;
  addRoomName = '';
  roomname = '';
  message = '';
  users = [];
  chats = [];
  matcher = new MyErrorStateMatcher();
  styleChatBox = 'display: none';
  notifications = [];

  //
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private token: TokenService,
    private oauthService: OauthService,
    private socialAuthService: SocialAuthService,
    private dataService: DataService,
    private notificationService: NotificationService
  ) {

    // this.nickname = localStorage.getItem('nickname1');
    if (this.token.getUser() == null) {
      console.log('aaaaaaa');
    } else {
      this.checkLogin = true;
      this.nickname = this.token.getUser().fullName;
    }
    if (this.token.getUser() == null) {
      console.log('aaaaaaa');
    } else {
      this.id = this.token.getUser().id;
    }
    console.log(this.id);
    // firebase.database().ref('roomusers/').orderByChild('nickname').equalTo()
    //Hiển thị ra danh sách room bằng id.
    firebase.database().ref('roomusers/').orderByChild('id').equalTo(this.id).on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.isLoadingResults = false;
    });

  }

  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => this.message1 = message);

    this.formGroupName = this.formBuilder.group({
      roomname: [null, Validators.required]
    });

    if (this.token.getUser() === null) {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
        data => {
          console.log(data);
          this.socialUser = data;
          const tokenFacebook = new TokenDto(this.socialUser.authToken);
          this.oauthService.facebook(tokenFacebook).subscribe(
            res => {
              console.log(res);
              this.nickname = res.fullName;
              this.id = res.id;
              //Hien thi tin nhan
            });
        });
    } else {
      this.nickname = this.token.getUser().fullName;
    }
    //Chatroom-----------
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
    //  ------------------

  }

  scrollBottom() {
    var objDiv = document.getElementById('parentDiv');
    console.log('1');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  //Chatroom--------------------------
  onFormSubmit(form: any) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.id = this.token.getUser().id;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);

    const notification = form;
    this.refNotification.orderByChild('id').equalTo(chat.id).on('value', resp => {
      this.notifications = snapshotToArray(resp);

    });
    notification.content = this.nickname + ' send a message.';
    notification.idTo = this.idFriend;
    if (this.notifications.length == 0) {
      notification.quantity = 1;
    } else {
      if (this.notifications[this.notifications.length - 1].quantity == 0) {
        notification.quantity = 1;
      } else {
        notification.quantity = this.notifications[this.notifications.length - 1].quantity + 1;
      }
    }
    const newNotification = firebase.database().ref('notifications/').push();
    newNotification.set(notification);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  exitChat() {
    const chat = {roomname: '', nickname: '', message: '', date: '', type: ''};
    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.nickname === this.nickname);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({status: 'offline'});
      }
    });

    this.router.navigate(['/roomlist']);
  }

  //----------------------------------

  logout(): void {
    localStorage.removeItem('nickname1');
    this.router.navigate(['/logintest']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  show(roomname) {
    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', resp1 => {
      this.friend = snapshotToArray(resp1);
      if (this.friend[0].id == this.token.getUser().id){
        this.idFriend = this.friend[1].id;
      } else {
        this.idFriend = this.friend[0].id;
      }
      console.log(this.idFriend);
      // this.isLoadingResults = false;
    });
    this.styleChatBox = 'position: fixed; bottom: 20px; right: 350px; width: 340px; height: 420px; display: block; z-index: 1000';
    this.id = this.token.getUser().id;
    this.nickname = this.token.getUser().user.fullName;
    console.log(this.nickname);
    console.log(roomname);
    const chat = {roomname: '', nickname: '', id: '', message: '', date: '', type: ''};
    //Chatroom--------------------------
    this.ref.orderByChild('roomname').equalTo(roomname).on('value', resp => {
      this.chats = [];
      this.id = this.token.getUser().id;
      console.log(this.id);
      this.chats = snapshotToArray(resp);
      console.log(this.chats);
      setTimeout(() => {
        this.chatcontent.nativeElement.scrollTop = this.chatcontent.nativeElement.scrollHeight;
      }, 500);
    });
    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
      const roomusers = snapshotToArray(resp2);
      this.users = roomusers.filter(x => x.status === 'online');
    });
    //-------------------------------
    this.roomname = roomname;
  }

  close() {
    this.styleChatBox = 'display: none';
    this.isAddMember = false;
  }

  showGroupChat() {
    this.isCreateGroupChat = true;
  }

  createGroupChat(form: any) {
    const room = form;
    this.isCreateGroupChat = true;
    const newRoom = firebase.database().ref('rooms/').push();
    console.log(room);
    newRoom.set(room);
    this.isCreateGroupChat = false;
    // ChienTM: Tạo chat room mới khi kết bạn----------------------------------------------------
    //Thêm ROOMUSER mới
    firebase.database().ref('roomusers/').orderByChild('roomname')
      .equalTo(room.roomname)
      .once('value', (resp: any) => {
        let roomuser = [];
        const nickname = this.token.getUser().user.fullName;
        const avatar = 'data:image/png;base64,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';
        roomuser = snapshotToArray(resp);
        const user = roomuser.find(x => x.nickname === this.nickname);
        if (user !== undefined) {
          const userRef = firebase.database().ref('roomusers/' + user.key);
          userRef.update({status: 'online'});
        } else {
          this.id = this.token.getUser().id;
          const newroomuser = {roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: ''};
          newroomuser.roomname = room.roomname;
          newroomuser.nickname = nickname;
          newroomuser.id = this.id;
          newroomuser.status = 'online';
          newroomuser.avatar = avatar;
          newroomuser.nickNameFriend = room.roomname;
          console.log(newroomuser);
          const newRoomUser = firebase.database().ref('roomusers/').push();
          newRoomUser.set(newroomuser);
          // Thêm useroom của cả 2 người,
        }
      });
  }

  //Tìm kiếm bạn
  search(value: any) {
    if (value == '') {
      firebase.database().ref('roomusers/').orderByChild('id').equalTo(this.token.getUser().id).on('value', resp => {
        this.rooms = [];
        this.rooms = snapshotToArray(resp);
        console.log(this.rooms);
        this.isLoadingResults = false;
      });
    } else {
      console.log(value);
      firebase.database().ref('roomusers/').orderByChild('nickNameFriend').equalTo(value).on('value', resp1 => {
        this.rooms = [];
        this.rooms = snapshotToArray(resp1);
        console.log(this.rooms);
        // this.isLoadingResults = false;
      });
    }
  }

  showAddNewMember(roomname: any) {
    this.addRoomName = roomname;
    this.isAddMember = true;
  }

  addNewMember(nickName: any) {
    console.log(nickName);
    console.log(this.addRoomName);
    firebase.database().ref('roomusers/').orderByChild('nickname').equalTo(nickName).on('value', resp1 => {
      this.friend = snapshotToArray(resp1);
      this.idFriend = this.friend[0].id;
      console.log(this.friend);
      // this.isLoadingResults = false;
    });
    //Thêm ROOMUSER mới
    firebase.database().ref('roomusers/').orderByChild('roomname')
      .equalTo(this.addRoomName)
      .once('value', (resp: any) => {
        console.log(nickName);
        let roomuser = [];
        const avatar = 'https://robohash.org/eavoluptasomnis.png?size=50x50&set=set1';
        roomuser = snapshotToArray(resp);
        const user = roomuser.find(x => x.nickname === this.nickname);
        this.id = this.token.getUser().id;
        const newroomuser = {roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: ''};
        newroomuser.roomname = this.addRoomName;
        newroomuser.nickname = nickName;
        newroomuser.id = this.idFriend;
        newroomuser.status = 'online';
        newroomuser.avatar = avatar;
        newroomuser.nickNameFriend = this.addRoomName;
        console.log(newroomuser);
        const newRoomUser = firebase.database().ref('roomusers/').push();
        newRoomUser.set(newroomuser);
        this.isAddMember = false;
      });
  }

  myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  myFunction1() {
    document.getElementById('myDropdown1').classList.toggle('show');
    firebase.database().ref('roomusers/').orderByChild('nickNameFriend').equalTo(this.roomname).on('value', resp1 => {
      this.members = [];
      this.members = snapshotToArray(resp1);
      console.log(this.members);
      // this.isLoadingResults = false;
    });
  }


}


// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById('myDropdown');
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
};




