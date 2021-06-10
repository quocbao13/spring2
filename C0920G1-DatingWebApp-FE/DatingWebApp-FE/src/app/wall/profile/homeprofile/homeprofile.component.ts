import {Component, OnInit} from '@angular/core';
import {UserImg} from "../../user-img";
import {IProfileDTO} from "../../DTO/profile-dto";
import {IComment} from "../../DTO/comment";
import {Ipost} from "../../DTO/post";
import {LoadResourceService} from "../../loadingre.service";
import {ProfileService} from "../../profile.service";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../../security/login-service/token.service";
import {DataService} from "../../../service/data.service";
import {IFriendDTO} from "../../../friend/ifriend-dto";
import {FriendService} from "../../../service/friend.service";
import {MessageComponent} from "../../../material/message/message.component";
import {BlockDialogComponent} from "../../../material/block-dialog/block-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostComponent} from "../../../post/create-post/create-post.component";
import {PostService} from "../../../post/post.service";
import {EditPostComponent} from "../../../post/edit-post/edit-post.component";
import {Observable} from "rxjs";


import {ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {LyDialog} from '@alyle/ui/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import {ImgCropperEvent} from '@alyle/ui/image-cropper';
import {finalize} from 'rxjs/operators';
import {UserService} from 'src/app/service/user.service';
import {CropperDialogComponent} from '../../cropper-dialog/cropper-dialog.component';
import {IInfoAccount} from "../../DTO/iaccount";
import * as firebase from "firebase";
import {snapshotToArray} from "../../../chat/roomlist/roomlist.component";
import {MyErrorStateMatcher} from "../../../chat/login/login.component";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-homeprofile',
  templateUrl: './homeprofile.component.html',
  styleUrls: ['./homeprofile.component.scss']
})
export class HomeprofileComponent implements OnInit {
  id: number;
  userImg: UserImg = new UserImg();
  iProfileDTO: IProfileDTO[] = [];
  icomment: IComment;
  idUser: number;
  idAccount: number;
  userAvatar: any;
  post: Ipost[] = [];
  iInfoAccount: IInfoAccount[] = [];
  pageable: any;
  size: number = 2;
  iProfileDTOfriend: IProfileDTO[] = [];
  friendList: IFriendDTO[] = [];
  suggestionToMakeFriendsDTO: IFriendDTO[] = [];

  iAccount: IFriendDTO;
  userID: number = 0;
  iFriendDTO: IFriendDTO;
  loadingData: boolean = false;
  displayData: boolean = false;
  loading: boolean;

  page = 2;
  imgPost: any = [];
  listImgPost = [];
  isCheckImg = [];
  public listImgShow = [];
  styleShowListImg = 'display:none';


  title = 'imgResizeProject';
  myFile: Blob;
  selectedImg: any = null;
  imgSrc;


//Khanh
  avatarUser: any;
  isShown;
  listPost: any = [];

  //Duong Nguyen Bao
  id1 = '';
  bg: any;
  avatar: any;
  fullName: any;
  idS: any;
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
  check1 = false
  idBao: any;
  //ChienTM--------------------------------
  public account: any;
  public user: any;
  nickname = '';
  roomname = '';
  ref = firebase.database().ref('rooms/');
  matcher = new MyErrorStateMatcher();
  userName: any;
  constructor(private loadingreService: LoadResourceService,
              private profileService: ProfileService,
              private activatedRoute: ActivatedRoute,
              private  tokenStorage: TokenService,
              private dataService: DataService,
              private friendService: FriendService,
              private dialog: MatDialog,
              //Khanh
              private postService: PostService,
              private _dialog: LyDialog,
              private _cd: ChangeDetectorRef,
              private storage: AngularFireStorage,
              private tokenService: TokenService,
              private userService: UserService,
              private snackBar: MatSnackBar
  ) {
    this.getAccountInformation();
  }


  ngOnInit(): void {
    this.userName = this.tokenService.getUser().id;
    this.idAccount = this.tokenStorage.getUser().id;
    this.check1 = this.idAccount != this.idBao;
    // this.check1 = this.idAccount != this.iProfileDTO[0].accountIdUser;

    this.userAvatar = this.tokenStorage.getUser().avatar

    this.getAllPostList();

    this.dataService.changeMessage('Hello World');
    console.log(this.idAccount)

    this.getAllFriendList();

    //Khanh
    this.avatarUser = this.tokenStorage.getUser().user.avatar;
    this.isShown = this.tokenService.getUser().id;

    this.idUser = this.tokenService.getUser().id;

    this.userService.getAvatar(this.idUser).subscribe((data: any) => {
      console.log(data);
      if (data !== null) {
        this.imgSrc = data[0];
        console.log(this.imgSrc);
      } else {
        this.imgSrc = '/assets/img/anh1.jpg'
      }
    })

    //  Duong Nguyen Bao
    this.activatedRoute.params.subscribe(data => {
      this.idBao = data["id"];
      this.friendService.getStatusId(this.accountId, this.idBao).subscribe(data => {
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

  //Khanh
  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      autoFocus: false,
      width: '500px',
      maxHeight: '90vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(data => {
      if (this.postService.getStatus()) {
        this.ngOnInit();
      }
    })
  }

  //Khanh
  openDialogEditPost(id) {
    this.postService.findById(id).subscribe(result => {
      const dialogRef = this.dialog.open(EditPostComponent, {
        autoFocus: false,
        width: '500px',
        data: {data1: result},
        maxHeight: '90vh',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(data => {
        if (this.postService.getStatus()) {
          this.ngOnInit();
        }
      });
    });
  }

  // getAllPostAccount() {
  //   this.profileService.getAllPostAccount().subscribe((data) => {
  //     this.iProfileDTO = data;
  //     console.log(this.iProfileDTO)
  //   });
  // }
  incrementPage() {
    this.page += 2;
    this.getAllPostList();
  }


  getAllPostList() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id == this.idAccount) {
      this.profileService.getAllPostAccount().subscribe((data) => {
        this.iInfoAccount = data;
        this.bg = this.iInfoAccount[0].userBackground;
        this.avatar = this.iInfoAccount[0].userAvatar;
        this.fullName = this.iInfoAccount[0].fullnameUser;
        this.idS = this.iInfoAccount[0].accountIdUser;
        console.log(this.bg);
      });
      this.profileService.getComment().subscribe((data) => {
        this.iProfileDTO = data;
        console.log(this.iProfileDTO)
      });

    } else {
      this.profileService.getAllPostFriendList(this.id).subscribe((data: any) => {
        this.iInfoAccount = data;
        this.bg = this.iInfoAccount[0].userBackground;
        this.avatar = this.iInfoAccount[0].userAvatar;
        this.fullName = this.iInfoAccount[0].fullnameUser;
        this.idS = this.iInfoAccount[0].accountIdUser;

        console.log(this.iInfoAccount)

      });
      this.profileService.getCommentUser(this.id).subscribe((data: any) => {
        this.iProfileDTO = data;
        this.bg = this.iInfoAccount[0].userBackground;
        this.avatar = this.iInfoAccount[0].userAvatar;
        this.fullName = this.iInfoAccount[0].fullnameUser;
        this.idS = this.iInfoAccount[0].accountIdUser;

        console.log(this.iProfileDTO)
      })
    }
  }

  loadScript() {
    this.loadingreService.loadScript('assets/js/main.min.js');
    this.loadingreService.loadScript('assets/js/backgroundVideo.js');
    this.loadingreService.loadScript('assets/js/custom.js');
    this.loadingreService.loadScript('assets/js/map-init.js');
    this.loadingreService.loadScript('assets/js/script.js');
    this.loadingreService.loadScript('assets/js/strip.pkgd.min.js');
    this.loadingreService.loadScript('assets/js/userincr.js');
    this.loadingreService.loadScript('assets/js/world.js');


  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


  getAccountInformation() {
    this.friendService.getSuggestionToMakeFriends(this.userID).subscribe((data1: any) => {
      this.friendList = data1;
      var that = this;
      setTimeout(function () {
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

  getAllFriendList() {
    this.id = this.tokenService.getUser().id;
    this.friendService.getAccountById(this.id).subscribe((data: IFriendDTO) => {
      this.iAccount = data;
      this.friendService.getByIdFriend(this.id, this.page).subscribe(data => {
        this.iAccount = data;
        this.friendList = data;
      });
    });
  }

  blockFriend(id: number) {
    const friendByIdId = this.friendList.find(item => item.userID === id);
    const dialogRef = this.dialog.open(BlockDialogComponent, {
      data: friendByIdId && friendByIdId.fullName
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      if (confirmed == true) {
        this.friendService.blockFriend(this.id, id).subscribe(data => {
          console.log('friend : ' + id);
          this.iAccount = data;
          this.ngOnInit();
        }, error => {
          if (error.status === 404) {
            const dialogRef = this.dialog.open(MessageComponent, {
              data: 'Không tồn tại trong danh sách bạn bè.'
            });
            dialogRef.afterClosed();
          }
        });
      }
    });
  }

  openCropperDialog(event: Event) {
    // this.imgSrc = null!;
    this._dialog.open<CropperDialogComponent, Event>(CropperDialogComponent, {
      data: event,
      width: 320,
      disableClose: true
    }).afterClosed.subscribe((result?: ImgCropperEvent) => {
      if (result) {
        this.imgSrc = result.dataURL;
        this._cd.markForCheck();
        const reader = new FileReader();
        this.myFile = this.dataURItoBlob(this.imgSrc);
        reader.readAsDataURL(this.myFile);
        this.uploadFile(this.myFile)
      }
    });
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }

  uploadFile(file) {
    var n = Date.now();
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.selectedImg = fileRef.getDownloadURL();
          this.selectedImg.subscribe(url => {
            if (url) {
              this.imgSrc = url;
            }
            console.log(this.imgSrc);
            this.userService.updateAvatar(this.idUser, this.imgSrc).subscribe(next => {
              this.userService.openSnackBar('Đổi ảnh đại diện thành công!', 'Đóng');
            }, error => {
              this.userService.openSnackBar('Đổi ảnh đại diện thất bại!', 'Đóng');
            });
          })
        }))
  }

  showListImg(img: string[]) {

    this.listImgShow = img;

    this.styleShowListImg = 'position: fixed; top: 120px; width: 1200px; height: 500px; left: 180px; display: block; index-z: 1000';
  }

  addFriend() {
    if (this.button == 'Kết bạn +') {
      this.friendService.addFriend(this.idAccount, this.idBao).subscribe();
      this.button = 'Hủy lời mời';
    } else if (this.button == 'Hủy lời mời') {
      this.friendService.deleteFriendRequest(this.idAccount, this.idBao).subscribe();
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
