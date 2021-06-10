import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendComponent } from './friend/friend.component';
import { RouterModule } from '@angular/router';
import { SuggestionComponent } from './suggestion/suggestion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AddFriendComponent,
    FriendComponent,
    SuggestionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FriendComponent,
    SuggestionComponent
  ],
})
export class FriendModule { }
