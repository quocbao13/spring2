import {Component, Input, OnInit} from '@angular/core';
import {UserImg} from "../user-img";
import {IProfileDTO} from "../DTO/profile-dto";
import {ProfileService} from "../profile.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header-wall',
  templateUrl: './header-wall.component.html',
  styleUrls: ['./header-wall.component.scss']
})
export class HeaderWallComponent implements OnInit {
  //
  @Input() userImg : UserImg;
  id: number;

  iProfileDTO : IProfileDTO;
  idUser: number;
  idAccount :number;

  constructor(private profileService : ProfileService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }





}
