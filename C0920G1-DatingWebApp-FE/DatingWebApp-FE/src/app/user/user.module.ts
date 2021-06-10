import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditUserComponent} from './edit-user/edit-user.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {ListUserComponent} from './list-user/list-user.component';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {EditPasswordComponent} from './edit-password/edit-password.component';
import {NgxLoadingModule} from 'ngx-loading';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';

import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";

import { ConfirmPassComponent } from './confirm-pass/confirm-pass.component';
import { FocusFormDirective } from './edit-password/FocusFormDirective';



@NgModule({
  declarations: [EditUserComponent,
    CreateUserComponent,
    ListUserComponent,
    DeleteUserComponent,
    EditPasswordComponent,
    ConfirmPassComponent,
    FocusFormDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    NgxLoadingModule,
    RouterModule,
    NgxLoadingModule.forRoot({}),

    MatDatepickerModule,
    MatInputModule

  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

  ]

})
export class UserModule {
}
