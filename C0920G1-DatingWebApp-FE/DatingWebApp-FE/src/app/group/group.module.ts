import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { DetailGroupComponent } from './detail-group/detail-group.component';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MemberGroupComponent} from './member-group/member-group.component';
import {RouterModule} from '@angular/router';
import {NgxLoadingModule} from "ngx-loading";


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JoinGroupComponent } from './create-group/join-group/join-group.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AppModule} from "../app.module";


@NgModule({

  declarations: [CreateGroupComponent, ListGroupComponent, DetailGroupComponent, DeleteGroupComponent, EditGroupComponent,

    MemberGroupComponent, EditGroupComponent, JoinGroupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireStorageModule,
    // AngularFireDatabaseModule,
  ]
})

export class GroupModule {
}
