import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import {UserNewInfoDtoRequest} from "../../model/user/UserNewInfoDtoRequest";
import {TokenService} from "../../security/login-service/token.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/storage";
import {Router} from "@angular/router";
import {UserHobby} from "../../model/user/UserHobby";
import {District} from "../../model/user/District";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  public userExisting: UserNewInfoDtoRequest;
  public userPresentId: number;
  public district: District;
  public formUserInfoDetail: FormGroup;

  constructor(
    public userService: UserService,
    public tokenService: TokenService,
    public formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userPresentId = this.tokenService.getUser().id;
    console.log("user present id: " + this.userPresentId);
    if (this.userPresentId == null) {
      this.router.navigateByUrl('login');
    }

    this.userService.getUserByUserId(this.userPresentId).subscribe(userNewInfoDtoData => {
      this.userExisting = userNewInfoDtoData;
      console.log('full name detail = ' + this.userExisting.fullName);
    });


  }

}
