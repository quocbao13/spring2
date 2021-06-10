import { AddFriendComponent } from './friend/add-friend/add-friend.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateGroupComponent} from "./group/create-group/create-group.component";
import { ListChatComponent } from './chat/list-chat/list-chat.component';
import { ListGroupComponent } from './group/list-group/list-group.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListMemberComponent } from './admin/list-member/list-member.component';
import { ListViolationsComponent } from './admin/list-violations/list-violations.component';
import { DetailGroupComponent } from './group/detail-group/detail-group.component';
import { MemberGroupComponent } from './group/member-group/member-group.component';
import { FriendComponent } from './friend/friend/friend.component';
import { SuggestionComponent } from './friend/suggestion/suggestion.component';
import { ListPostComponent } from './post/list-post/list-post.component';
import { LoginComponent } from './chat/login/login.component';
import { RoomlistComponent } from './chat/roomlist/roomlist.component';
import { AddroomComponent } from './chat/addroom/addroom.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import {LoginAccountComponent} from './security/login-account/login-account.component';
import {VerifyComponent} from './security/verify/verify.component';
import {SearchComponent} from './search/search.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { EditPasswordComponent } from './user/edit-password/edit-password.component';
import {ListDatingComponent} from "./dating/list-dating/list-dating.component";
import { ChangeAvatarComponent } from './wall/change-avatar/change-avatar.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';
import {CommonModule} from "@angular/common";
import {HomeprofileComponent} from "./wall/profile/homeprofile/homeprofile.component";
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import {CreateUserComponent} from "./user/create-user/create-user.component";
import { EditUserComponent } from './user/edit-user/edit-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomerAuthService} from './security/guards/customer-auth.service';
import {NgxLoadingModule} from "ngx-loading";
import { environment } from '../environments/environment';

import {ImgComponent} from "./wall/img/img.component";



import {AdminAuthService} from './security/guards/admin-auth.service';

const routes: Routes = [
  //path tuan login
  {path: '', component: LoginAccountComponent},
  {path: 'login', component: LoginAccountComponent},
  {path: 'verify-account', component: VerifyComponent},
  //path của cường
  {path: 'member', component: ListMemberComponent},
  {path: 'report/:id', component: ListViolationsComponent},
  //_______________________________________________________//
  //khoa
  {path: 'search', component: SearchComponent},
  {path: 'list-chat', component: ListChatComponent},
  {path: 'group-add', component: CreateGroupComponent},


  {path: 'post-list', component: ListPostComponent, canActivate: [CustomerAuthService]},
  //Hưng
  { path: 'profile/friend', component: FriendComponent },
  {path: 'group-list', component: ListGroupComponent, canActivate: [CustomerAuthService]},
  {path: 'suggestion-to-make-friends', component: SuggestionComponent},
  {path: 'profile/friend/list', component: FriendComponent},
  // Path cua thinh
  {path: 'edit-info',component:EditUserComponent},
  // Path cua chien
  {path: 'list-chat', component: ListChatComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  // Path of Nhan
  {path: 'group/:id/post', component: DetailGroupComponent},
  {path: 'group/:id', component: DetailGroupComponent},
  {path: 'group/:id/member', component: MemberGroupComponent},



  { path: 'post-list', component: ListPostComponent },






  // Path of Nhan

  {path: 'suggestion-to-make-friends', component: SuggestionComponent},

  //Path ChienTM.
  {path: 'logintest', component: LoginComponent},
  {path: 'roomlist', component: RoomlistComponent},
  {path: 'addroom', component: AddroomComponent},
  {path: 'chatroom/:roomname', component: ChatroomComponent},
  //Path Hieu
  {path: 'new-info', component: CreateUserComponent},
  {path: 'new-info-detail', component: DetailUserComponent},
  //Path quoc bao
  {path: 'dating', component: ListDatingComponent},
  // Path of Trang
  {path: 'edit-password', component: EditPasswordComponent},
  {path: 'edit-avatar', component: ChangeAvatarComponent},
  // Path of BaoDN
  // {path: ':id', component: AddFriendComponent},


  //__________________________________________________//
  // của Hiệp đó , năn nỉ làm ơn đừng đụng vào nhé ,
  {path: 'profile/list-post/:id', component: HomeprofileComponent},
  {path: 'profile', component: HomeprofileComponent},

  {path: 'profile/list-post', component: HomeprofileComponent},

  {path: 'profile/img', component: ImgComponent},
  {path: 'profile/img/:id', component: ImgComponent},

  //path not found
  {path: '**', redirectTo: '/404'},
  {path: '404', component: NotFoundComponent},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  exports: [RouterModule],
  declarations: [DetailUserComponent]
})
export class AppRoutingModule {
}
