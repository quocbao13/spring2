import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../service/group.service";
import {MatDialog} from "@angular/material/dialog";
import {TokenService} from "../../../security/login-service/token.service";

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.scss']
})
export class JoinGroupComponent implements OnInit {
  public friendList: any = [];

  constructor(
    public groupService: GroupService,
    public dialog: MatDialog,
    public token: TokenService
  ) { }

  ngOnInit(): void {
    this.groupService
  }

}
