import { FriendService } from './../../service/friend.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/security/login-service/token.service';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';


import { snapshotToArray } from '../../chat/roomlist/roomlist.component';


import { DataService } from 'src/app/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyErrorStateMatcher } from '../../chat/login/login.component';


@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {
  id = '';
  public confirm = 'Đồng Ý';
  public deleteRequest = 'Từ Chối';
  public friendRequestList;
  public listLength;
  public statusId;
  public accountId;
  public userId;
  public profile;
  public button = 'Kết bạn +';
  public loaded = 5;
  //ChienTM--------------------------------
  public account: any;
  public user: any;
  nickname = '';
  roomname = '';
  ref = firebase.database().ref('rooms/');
  matcher = new MyErrorStateMatcher();

  //----------------------------------------
  constructor(
    private tokenService: TokenService,
    private friendService: FriendService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dataService.changeMessage('Hello World');

    //Lấy id account đang login để so sánh với id user
    this.accountId = this.tokenService.getUser().id;

    //Lấy số lượng lời mời để phục vụ việc tải thêm
    this.friendService.countFriendRequest(this.accountId).subscribe(data => {
      this.listLength = data;
    });
    //Hiện danh sách lời mời - CẦN NGHIÊN CỨU LẠI THỜI ĐIỂM CHẠY
    this.friendService.showFriendRequestList(this.accountId, this.loaded).subscribe(data => {
      this.friendRequestList = data;
    });

    //Lấy user từ id trong url
    this.activatedRoute.params.subscribe(data => {
      this.userId = data["id"];
      this.friendService.getUser(this.userId).subscribe(data => {
        this.profile = data;
      });
      this.friendService.getStatusId(this.accountId, this.userId).subscribe(data => {
        this.statusId = data;
        switch (this.statusId) {
          case 1:
            this.button = '✓ Bạn bè';
            break;
          case 2:
            this.button = '♥ Hẹn hò';
            break;
          case 3:
            this.button = 'Hủy lời mời';
            break;
          case 4:
            document.getElementById('status').hidden = true;
            break;
        }
      });
    })
  }

  addFriend() {
    if (this.button == 'Kết bạn +') {
      this.friendService.addFriend(this.accountId, this.userId).subscribe();
      this.button = 'Hủy lời mời';
    } else if (this.button == 'Hủy lời mời') {
      this.friendService.deleteFriendRequest(this.accountId, this.userId).subscribe();
      this.button = 'Kết bạn +';
    }
  }
  /*
  * userId bên dưới là tên gọi cho tham số truyền vào từ html,
  * không phải biến userId của component, phân biệt bằng từ khóa this.
  */
  deleteFriendRequest(accountId, userId) {
    this.friendService.deleteFriendRequest(accountId, userId).subscribe(() => {
      document.getElementById(userId + '_1').hidden = true;
      document.getElementById(userId + '_2').hidden = true;
      document.getElementById(userId + '_3').hidden = false;
    }, error => {
      this.openSnackBar(error.error, 'X');
      this.friendService.countFriendRequest(this.accountId).subscribe(data => {
        this.listLength = data;
      });
      this.friendService.showFriendRequestList(this.accountId, this.loaded).subscribe(data => {
        this.friendRequestList = data;
      });
    });
  }

  confirmFriend(accountId, userId) {
    console.log(accountId);
    console.log(userId);
    console.log('aaaaaaaaaaaaaaaaaaaaaaa');
    this.friendService.confirmFriend(accountId, userId).subscribe(() => {
      // ChienTM: Tạo chat room mới khi kết bạn----------------------------------------------------
      this.friendService.getUser(this.userId).subscribe(data => {
        this.user = data;
        this.friendService.getUser(this.accountId).subscribe(data2 => {
          this.account = data2;
          console.log(data2);
          this.friendService.confirmFriend(this.accountId, this.userId).subscribe();
          const newRoom = firebase.database().ref('rooms/').push();
          console.log(this.account);
          const room = { roomname: '' };
          room.roomname = this.account.fullName + ',' + this.user.fullName;
          newRoom.set(room);
          //Thêm ROOMUSER mới
          firebase.database().ref('roomusers/').orderByChild('roomname')
            .equalTo(room.roomname)
            .once('value', (resp: any) => {
              let roomuser = [];
              const nickname = this.account.fullName;
              const nickname1 = this.user.fullName;
              const id1 = this.user.id;
              const avatar = this.user.avatar;
              const avatar1 = this.account.avatar;
              const nickNameFriend = this.user.fulName;
              roomuser = snapshotToArray(resp);
              const user = roomuser.find(x => x.nickname === this.nickname);
              if (user !== undefined) {
                const userRef = firebase.database().ref('roomusers/' + user.key);
                userRef.update({ status: 'online' });
              } else {
                this.id = this.tokenService.getUser().id;
                const newroomuser = { roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: '' };
                newroomuser.roomname = room.roomname;
                newroomuser.nickname = nickname;
                newroomuser.id = this.tokenService.getUser().id;
                newroomuser.status = 'online';
                newroomuser.avatar = avatar;
                newroomuser.nickNameFriend = nickname1;
                console.log(newroomuser);
                const newRoomUser = firebase.database().ref('roomusers/').push();
                newRoomUser.set(newroomuser)
                // THêm userroom của cả 2 người,
                const newroomuser1 = { roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: '' };
                newroomuser1.roomname = room.roomname;
                newroomuser1.nickname = nickname1;
                newroomuser1.id = id1;
                newroomuser1.status = 'online';
                newroomuser1.avatar = avatar1;
                newroomuser1.nickNameFriend = nickname;
                console.log(newroomuser1);
                const newRoomUser1 = firebase.database().ref('roomusers/').push();
                newRoomUser1.set(newroomuser1);
              }
            });
        });
      });
      document.getElementById(userId + '_1').hidden = true;
      document.getElementById(userId + '_2').hidden = true;
      document.getElementById(userId + '_4').hidden = false;
    });
  }

  //tải thêm dữ liệu
  loadMore() {
    this.loaded += 5;
    this.friendService.showFriendRequestList(this.accountId, this.loaded).subscribe(data => {
      this.friendRequestList = data;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


