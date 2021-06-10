import { Component, OnInit } from '@angular/core';
import {IFriendDTO} from '../ifriend-dto';
import {FriendService} from '../../service/friend.service';
import {TokenService} from "../../security/login-service/token.service";

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {
  suggestionToMakeFriendsDTO: IFriendDTO[] = [];
  id: number;
  userID: number;
  iFriendDTO: IFriendDTO;
  friendList: IFriendDTO[] = [];
  loadingData: boolean = false;
  displayData: boolean = false;


  constructor(private friendService: FriendService,
              private tokenService: TokenService,
  ) {
    this.getAccountInformation();
  }

  ngOnInit(): void {
  }

  getAccountInformation() {
    this.friendService.getSuggestionToMakeFriends(this.tokenService.getUser().id).subscribe((data1: any) => {
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

}
