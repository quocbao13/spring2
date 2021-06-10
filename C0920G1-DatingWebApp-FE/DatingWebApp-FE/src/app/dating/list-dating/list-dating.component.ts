import { Component, OnInit } from '@angular/core';
import {DatingService} from "../../service/dating.service";
import {DataService} from "../../service/data.service";
import {FriendService} from "../../service/friend.service";
import {TokenService} from "../../security/login-service/token.service";

@Component({
  selector: 'app-list-dating',
  templateUrl: './list-dating.component.html',
  styleUrls: ['./list-dating.component.scss']
})
export class ListDatingComponent implements OnInit {

  userRecommend = [];
  hobbyRecommend = [];
  public loading = false;
  idS: any;
  idUser: string;
  userName = this.tokenStorage.getUser().user.fullName;
  avatarUser: string;

  constructor(
    private datingService: DatingService,
    private dataService: DataService,
    private friendService: FriendService,
    private tokenStorage: TokenService,
  ) {
    this.idUser = tokenStorage.getUser().id;

    this.avatarUser = this.tokenStorage.getUser().user.avatar;
  }

  ngOnInit(): void {
    this.idS = this.tokenStorage.getUser().id;
    this.dataService.changeMessage('Hello World');
    this.loading = true;
    this.datingService.getUserRecommendList().subscribe(value => {
      this.userRecommend = value;
    }, error => {
      this.loading = false;
    }, () => {
      this.loading = false;
    });
    this.datingService.getHobbyRecommendList().subscribe(value => {
      this.hobbyRecommend = value;
    })
  }

  saveDislike(id) {
    this.datingService.saveDislike(id).subscribe(value => {
      this.loading = true;
      this.datingService.getUserRecommendList().subscribe(value => {
        this.userRecommend = value;
      }, error => {
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }, error => {
      this.loading = false
    })
  }

  addFriend(userId) {
      this.friendService.addFriend(this.tokenStorage.getUser().id, userId).subscribe(value => {
        this.loading = true;
        this.datingService.getUserRecommendList().subscribe(value => {
          this.userRecommend = value;
        }, error => {
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      }, error => {
        this.loading = false
      });
    }

}
