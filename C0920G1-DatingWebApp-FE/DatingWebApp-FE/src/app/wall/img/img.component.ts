import { Component, OnInit } from '@angular/core';
import {LoadResourceService} from "../loadingre.service";
import {ProfileService} from "../profile.service";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../security/login-service/token.service";
import {DataService} from "../../service/data.service";
import {FriendService} from "../../service/friend.service";
import {MatDialog} from "@angular/material/dialog";
import {PostService} from "../../post/post.service";
import {Img} from "../DTO/img";

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {
  id: number;
  img : Img []=[];

  idUser: number;
  idAccount :number;







//Khanh
  avatarUser: any;
  isShown;
  listPost: any = [];
  constructor(private loadingreService :LoadResourceService,
              private profileService : ProfileService,
              private activatedRoute: ActivatedRoute,
              private  tokenStorage: TokenService,
              private dataService: DataService,
              private friendService: FriendService,
              private tokenService: TokenService,
              private dialog: MatDialog,
              //Khanh
              private postService: PostService
  ) { }

  ngOnInit(): void {
    this.idAccount=this.tokenStorage.getUser().id;
   this.getAllimguser();
  }

  getAllimguser(){
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id==this.idAccount){
      this.profileService.getAllimgAccount().subscribe((data) => {
        this.img = data;


        console.log(this.img);
      });


    }else {
      this.profileService.getAllimg(this.id).subscribe((data: any) => {
        this.img = data;
        console.log(this.img)

      });


    }
  }


}
