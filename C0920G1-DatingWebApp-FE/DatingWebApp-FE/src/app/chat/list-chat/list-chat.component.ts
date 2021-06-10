import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.scss']
})
export class ListChatComponent implements OnInit {
  userList: any = [];
  chatroom: any = [];

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this.chatService.getListUser().subscribe(data => {
      this.userList = data;
      console.log(this.userList);
    }, error => console.log(error));

    this.chatService.getAllChatRoom().subscribe((data) => {
      console.log(data);
      this.chatroom = data;
    });
  }
}
