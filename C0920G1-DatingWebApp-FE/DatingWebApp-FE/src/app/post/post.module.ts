
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NgxLoadingModule} from "ngx-loading";

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPostComponent} from './edit-post/edit-post.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {ListPostComponent} from './list-post/list-post.component';
import {DeletePostComponent} from './delete-post/delete-post.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {MatInputModule} from '@angular/material/input';
import {NgxEmojiPickerModule} from 'ngx-emoji-picker';
import {RouterModule} from '@angular/router';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FriendModule} from "../friend/friend.module";


@NgModule({
  declarations: [EditPostComponent, CreatePostComponent, ListPostComponent, DeletePostComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxLoadingModule,
        MatProgressBarModule,
        NgxEmojiPickerModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        PickerModule,
        MatInputModule,
        RouterModule,
        FriendModule,
    ]

})
export class PostModule {
}
