import {Component, OnInit} from '@angular/core';
import {FriendService} from '../../service/friend.service';
import {Friend} from '../../model/friend';
import {ActivatedRoute, Router} from '@angular/router';
import {IFriendDTO} from '../ifriend-dto';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DeleteDialogComponent} from '../../material/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MessageComponent} from '../../material/message/message.component';
import {TokenService} from '../../security/login-service/token.service';
import {BlockDialogComponent} from '../../material/block-dialog/block-dialog.component';
import * as firebase from "firebase";
import {snapshotToArray} from "../../chat/roomlist/roomlist.component";
import {MyErrorStateMatcher} from "../../chat/login/login.component";
import {DataService} from "../../service/data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  friendList: IFriendDTO[] = [];
  suggestionToMakeFriendsDTO: IFriendDTO[] = [];
  iAccount: IFriendDTO;
  accountId: number = 0;
  userID: number = 0;
  iFriendDTO: IFriendDTO;
  loadingData: boolean = false;
  displayData: boolean = false;
  loading: boolean;
  page = 5;
  fullName: string;
  //Duong Nguyen Bao
  id: any;
  idS: any;
  public confirm = 'Đồng Ý';
  public deleteRequest = 'Từ Chối';
  public friendRequestList;
  public listLength;
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

  idUser: any;
  userName: any;
  avatarUser: any;
  constructor(private friendService: FriendService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private tokenService: TokenService,
              private dataService: DataService,
              private snackBar: MatSnackBar) {
    this.accountId = this.tokenService.getUser().id;
    this.getAccountInformation();
    this.idUser = this.tokenService.getUser().id;
    this.userName = this.tokenService.getUser().user.fullName;
    this.avatarUser = this.tokenService.getUser().user.avatar;
  }

  ngOnInit(): void {
    this.dataService.changeMessage('Hello World');
    this.idS = this.tokenService.getUser().id;
    this.getAllFriendList();

    //Dương Nguyên Bảo
    //Lấy số lượng lời mời để phục vụ việc tải thêm
    this.friendService.countFriendRequest(this.accountId).subscribe(data => {
      this.listLength = data;
      console.log(data)
    });
    //Hiện danh sách lời mời
    this.friendService.showFriendRequestList(this.accountId, this.loaded).subscribe(data => {
      this.friendRequestList = data;
    });
    /////////////////////////
  }

  getAllFriendList() {
    this.id = this.tokenService.getUser().id;
    console.log( this.id = this.tokenService.getUser().id);
    this.friendService.getAccountById(this.id).subscribe((data: IFriendDTO) => {
      console.log(data);
      this.iAccount = data;
      this.friendService.getByIdFriend(this.id , this.page).subscribe(data => {
        this.iAccount = data;
        this.friendList = data;
        console.log(data);
      });
    });
  }



  blockFriend(id: number) {
    const friendByIdId = this.friendList.find(item => item.userID === id);
    const dialogRef = this.dialog.open(BlockDialogComponent, {
      data :   friendByIdId && friendByIdId.fullName
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      if (confirmed == true) {
        this.friendService.blockFriend(this.id, id).subscribe(data => {
            this.iAccount = data;
            this.ngOnInit();
          }, error => {
          if (error.status === 404){
            const dialogRef = this.dialog.open(MessageComponent, {
              data: 'Không tồn tại trong danh sách bạn bè.'
            });
            dialogRef.afterClosed();
          }
        });
      }
    });
  }



  getAccountInformation() {
      this.friendService.getSuggestionToMakeFriends(this.accountId).subscribe((data1: any) => {
        this.friendList = data1;
        var that = this;
        setTimeout(function() {
          if (that.suggestionToMakeFriendsDTO.length == data1.length) {
            that.loadingData = false;
            that.displayData = true;
          } else {
            that.suggestionToMakeFriendsDTO = data1;
            that.loadingData = false;
            that.displayData = false;
          }
        }, 1000);
      });
  }

  delFriend(id: number) {
    const friendByIdId = this.friendList.find(item => item.userID === id);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data :   friendByIdId && friendByIdId.fullName
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      if (confirmed == true) {
        this.friendService.delFriend(this.id, id).subscribe(data => {
            const dialogRef = this.dialog.open(MessageComponent, {
              data: 'Xóa thành công.'
            });
          dialogRef.afterClosed();
          this.ngOnInit();
        }, error => {
          if (error.status === 404){
            const dialogRef = this.dialog.open(MessageComponent, {
              data: 'Không tồn tại trong danh sách bạn bè.'
            });
            dialogRef.afterClosed();
          }
        });
      }
    });
  }

  incrementPage() {
    this.page += 5;
    this.getAllFriendList();
  }
  // Dương Nguyên Bảo
  addFriend(userID) {
      this.friendService.addFriend(this.accountId, userID).subscribe();
  }

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
    console.log('aaa');
    console.log(accountId);
    console.log(userId);
    this.friendService.confirmFriend(accountId, userId).subscribe(() => {
      // ChienTM: Tạo chat room mới khi kết bạn----------------------------------------------------
      this.friendService.getUser(userId).subscribe(data => {
        this.user = data;
        this.friendService.getUser(accountId).subscribe(data2 => {
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
                newroomuser.id = this.id;
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
    }, error => {
      this.openSnackBar(error.error, 'X');
      this.friendService.countFriendRequest(this.accountId).subscribe(data => {
        this.listLength = data;
      });
      this.friendService.showFriendRequestList(this.accountId, this.loaded).subscribe(data => {
        this.friendRequestList = data;
      });
    });
    this.friendService.confirmFriend(accountId, userId).subscribe();
    true;
    document.getElementById(userId + '_4').hidden = false;
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

