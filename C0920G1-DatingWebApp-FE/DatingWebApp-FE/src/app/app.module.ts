import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserModule } from './user/user.module';
// import Facebook không xóa
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import {LoginAccountComponent} from './security/login-account/login-account.component';
import {LoginFacebookComponent} from './security/login-facebook/login-facebook.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FriendModule} from './friend/friend.module';
import {HeaderComponent} from './header/header.component';
import {AngularFireModule} from '@angular/fire';

import {APP_BASE_HREF, DatePipe} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {AdminModule} from './admin/admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PostModule} from './post/post.module';
import {CommentModule} from './comment/comment.module';
import {ChatModule} from './chat/chat.module';
import {GroupModule} from './group/group.module';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { environment } from '../environments/environment';

import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';

import {DataService} from './service/data.service';
import { SearchComponent } from './search/search.component';
import { DeleteDialogComponent } from './material/delete-dialog/delete-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { MessageComponent } from './material/message/message.component';
import {RouterModule} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxLoadingModule } from 'ngx-loading';

import {DatingModule} from "./dating/dating.module";

import { BlockDialogComponent } from './material/block-dialog/block-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {WallModule} from "./wall/wall.module";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {SecurityModule} from './security/security.module';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    DeleteDialogComponent,
    MessageComponent,
    DeleteDialogComponent,
    MessageComponent,
    LoginAccountComponent,
    SearchComponent,
    DeleteDialogComponent,
    MessageComponent,
    NotFoundComponent,
    BlockDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    MatDialogModule,
    AdminModule,
    ChatModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GroupModule,
    BrowserAnimationsModule,
    PostModule,
    CommentModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FriendModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatDialogModule,
    //Chiến tắt config firebasse để làm chức năng nhắn tin,
    // ai cần dùng thì bật cái này, rồi vào app.component để tắt cái của chiến.
    // Không thì alo tui.
    AngularFireModule.initializeApp(environment.firebaseConfig),
    PickerModule,
    NgxEmojiPickerModule,
    MatButtonModule,
    RouterModule,
    WallModule,
    UserModule,
    DatingModule,
    NgxLoadingModule.forRoot({}),
    MatSelectModule,
    SecurityModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  entryComponents: [
    LoginAccountComponent,
    LoginFacebookComponent
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '713690097409-upo0o6p8af8g1216m09lrg64gua3s9np.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('650842855702067')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {provide: APP_BASE_HREF, useValue: '/'},
    DatePipe,
    DataService,
    MatDatepickerModule,
    MatNativeDateModule,
    DataService
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
