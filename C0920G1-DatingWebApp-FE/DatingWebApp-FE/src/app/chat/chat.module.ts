import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListChatComponent } from './list-chat/list-chat.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AddroomComponent } from './addroom/addroom.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [ListChatComponent, ChatroomComponent, AddroomComponent, RoomlistComponent, LoginComponent],
    exports: [
        ListChatComponent,
        RoomlistComponent
    ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    MatSidenavModule,
    MatCardModule,
    MatSortModule,
    MatButtonModule
  ]
})
export class ChatModule { }
