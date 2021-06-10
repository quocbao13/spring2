import {HttpClient} from '@angular/common/http';
import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {TokenService} from '../security/login-service/token.service';
import {Router} from '@angular/router';
import {DataService} from '../service/data.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../service/user.service';
import {SearchComponent} from "../search/search.component";
import { FriendService } from '../service/friend.service';
import {snapshotToArray} from "../chat/roomlist/roomlist.component";
import * as firebase from "firebase";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class HeaderComponent implements OnInit, OnDestroy {
  status: string;
  statusUserSetting: string;
  idUser;
  idTo: any;
  isLogged: boolean;
  token: string;
  message: string;
  subscription: Subscription;
  keywordName: string;
  formSearchByName: FormGroup;
  result: string;
  notificationList: any;
  amountNotification;
  imgAvatar = "";
  roleUser: string;
  FriendRequestNotificationList: any;
  refNotification = firebase.database().ref('notifications/');
  notificationQuantity = 0;
  notifications = [];
  styleBoxNotification = 'display: none';
  contentBox = '';
  dateBox = '';
  colorBox = '';
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private friendService: FriendService,
    private searchComponent: SearchComponent,
  ) {
    if (this.tokenService.getUser == null) {
      this.router.navigateByUrl("login")
    } else if (this.tokenService.getUser() !== null) {
      this.idUser = this.tokenService.getUser().id;
      this.setupStatus();
      this.refNotification.orderByChild('idTo').equalTo(this.idUser).on('value', resp => {
        this.notifications = snapshotToArray(resp);
        if (this.notifications.length != 0) {
          this.notificationQuantity = this.notifications[this.notifications.length - 1].quantity;
          this.contentBox = this.notifications[this.notifications.length - 1].content;
          this.dateBox = this.notifications[this.notifications.length - 1].date;
          this.idTo = this.notifications[this.notifications.length - 1].idTo;
          if (this.notificationQuantity != 0) {
            this.colorBox = 'color: red';
            this.styleBoxNotification = 'display:block; width: 200px; min-height: 50px; border: #aaaaaa 1px solid;border-radius: 5px; background: white; position: fixed;z-index: 1002; top : 100px; right: 100px; ';
          }
        }
        window.setTimeout(() => {this.styleBoxNotification = this.closeBox()}, 3000)
      });
    }
  }

  closeBox(): any {
    return 'display:none';
  }

  ngOnInit(): void {
    this.dataService.changeMessage("allllll");
    if (this.tokenService.getUser() != null) {
      this.roleUser = this.tokenService.getUser().roles;
      this.userService.getAvatar(this.idUser).subscribe((data: any) => {
        console.log(data);
        if(data !== null){
          this.imgAvatar = data[0];
          console.log(this.imgAvatar);
        } else{
          this.imgAvatar ='https://robohash.org/liberoautquibusdam.png?size=50x50&set=set1'
        }
      })
    }
    this.subscription = this.dataService.currentMessage.subscribe(message => this.message = message);
    this.formSearchByName = this.formBuilder.group({
      name: ['']
    });
    // lắng nghe wifi
    window.addEventListener('online', () => {
      this.result = this.setupStatus();
      if (this.result == 'online') {
        this.status = this.result;
        this.userService.setupStatus(this.idUser, this.status).subscribe(next => {
        }, error => {
          console.log(error.value)
        });
      }
    });
    window.addEventListener('offline', () => {
      this.status = 'off';
      this.userService.setupStatus(this.idUser, 'off').subscribe(next => {
      }, error => {
        console.log(error.value)
      });
    });

    //Hiện thông báo lời mời kết bạn - Bảo DN
    this.friendService.showFriendRequestNotification(this.idUser).subscribe(data => {
      this.notificationList = data;
      this.amountNotification = this.notificationList.length;
    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  logOut(): void {
    this.userService.setupStatus(this.idUser, 'off').subscribe();
    this.tokenService.logOut();
    this.isLogged = false;
    this.dataService.changeMessage('');
    this.router.navigateByUrl('login');
  }
  search() {
    this.keywordName = this.formSearchByName.controls.name.value;
    if(this.keywordName != ""){
      this.router.navigate(['/search'], {queryParams: {name: this.keywordName}});
      this.searchComponent.ngOnInit(this.keywordName);
    }
  }
  // search() {
  //   this.keywordName = this.formSearchByName.controls.name.value;
  //   if (this.router.url.indexOf("search") != -1) {
  //     this.searchComponent.ngOnInit(this.keywordName);
  //     // this.router.navigate(['/search'], {queryParams: {name: this.keywordName}});
  //   } else {
  //     this.router.navigate(['/search'], {queryParams: {name: this.keywordName}});
  //   }
  // }
  //trang O/F
  setupStatus(): string {
    this.userService.getStatusUserSetting(this.idUser).subscribe(next => {
        console.log(next[0])
        this.statusUserSetting = next[0]
        if (this.statusUserSetting == 'online' || this.statusUserSetting == null) {
          this.status = 'online'
          this.userService.setupStatus(this.idUser, this.status).subscribe(next => {
            this.result = 'online';
            return this.result;
          }, error => {
            console.log(error.value)
          });
        }
        if (this.statusUserSetting == 'off') {
          this.status = 'off'
          this.userService.setupStatus(this.idUser, 'off').subscribe(next => {
            this.result = 'off';
            return this.result;
          }, error => {
            console.log(error.value)
          });
        }
        if (this.statusUserSetting == 'away') {
          this.status = 'away'
          this.userService.setupStatus(this.idUser, 'away').subscribe(next => {
            this.result = 'away';
            return this.result;
          }, error => {
            console.log(error.value)
          });
        }
      },
      error => {
        console.log(error)
      }
    );
    return 'online';
  }
  //trang O/F
  setupStatusUserSetting(status: string) {
    this.status = status;
    this.userService.setupStatusUserSetting(this.idUser, this.status).subscribe(next => {
      console.log(this.status);
      this.userService.setupStatus(this.idUser, this.status).subscribe(next => {
        console.log(this.status);
      }, error => {
        console.log(error.value)
      });
    }, error => {
      console.log(error.value)
    });
  }

  //Hiện thông báo lời mời kết bạn - Bảo DN


  showFriendRequestNotification() {
    this.friendService.showFriendRequestNotification(this.idUser).subscribe(data => {
      this.FriendRequestNotificationList = data;
    });
  }

  clearQuantity() {
    this.notificationQuantity = 0;
    this.colorBox = '';
    const notification =  this.notifications[this.notifications.length - 1];
    notification.quantity = 0;
    firebase.database().ref('notifications/'+ notification.key).update(notification);
  }
}
