import {Component, OnInit} from '@angular/core';
import {GroupDetailService} from '../../service/group-detail.service';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../security/login-service/token.service';
import {DetailGroup} from '../../model/DetailGroup';
import {FriendService} from '../../service/friend.service';

@Component({
  selector: 'app-member-group',
  templateUrl: './member-group.component.html',
  styleUrls: ['./member-group.component.scss']
})
export class MemberGroupComponent implements OnInit {
  idGroup: number;
  users = [];
  checkJoinGroup: Boolean = false;
  checkIdAdminGroup: Boolean = false;
  idUserCurrent: number;
  userId: number[];
  groupDetail: DetailGroup;
  public button = 'Kết bạn +';
  statusId;

  constructor(private groupDetailService: GroupDetailService,
              private activatedRoute: ActivatedRoute,
              private token: TokenService,
              private friendService: FriendService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.idGroup = Number(data.id);
      this.getAllUserInGroup(this.idGroup);
      this.getGroupById(this.idGroup);
      this.idUserCurrent = this.token.getUser().id;
    });
  }

  getAllUserInGroup(idGroup: number) {
    this.groupDetailService.getAllUserInGroup(idGroup).subscribe(data => {
        this.users = data;
        this.idUserCurrent = this.token.getUser().id;
        for (let user of this.users) {
          if (this.idUserCurrent == user.id) {
            this.checkJoinGroup = true;
          }
          this.friendService.getStatusId(this.idUserCurrent, user.id).subscribe(data => {
            this.statusId = data;
            switch (this.statusId) {
              case 3:
                document.getElementById(user.id + '_1').hidden = false;
                document.getElementById(user.id + '_2').hidden = true;
                break;
            }
          })
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getGroupById(id: number) {
    this.groupDetailService.getGroupById(id).subscribe(data => {
      this.groupDetail = data;
      this.checkAdminGroup(this.idUserCurrent, this.groupDetail.adminGroupDTO.id);

    });
  }

  checkAdminGroup(idUser: number, idAdmin: number) {
    if (idUser == idAdmin) {
      this.checkIdAdminGroup = true;
      this.checkJoinGroup = true;
    }
  }

  joinGroup(idUser: number, idGroup: number) {
    this.groupDetailService.joinGroup(idUser, idGroup).subscribe(() => {
      this.ngOnInit();
      this.checkJoinGroup = true;
    });
  }

  outGroup(idUser: number, idGroup: number) {
    this.groupDetailService.outGroup(idUser, idGroup).subscribe(() => {
      this.ngOnInit();
      this.checkJoinGroup = false;
    });
  }

  addFriend(id: number) {
    if(document.getElementById(id + '_1').hidden == false) {
      this.friendService.addFriend(this.idUserCurrent, id).subscribe();
      document.getElementById(id + '_1').hidden = true;
      document.getElementById(id + '_2').hidden = false;
    } else {
      this.friendService.deleteFriendRequest(this.idUserCurrent, id).subscribe();
      document.getElementById(id + '_1').hidden = false;
      document.getElementById(id + '_2').hidden = true;
    }
  }
}
