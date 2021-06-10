import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginAccountComponent} from './login-account/login-account.component';
import {LoginFacebookComponent} from './login-facebook/login-facebook.component';
import {VerifyComponent} from './verify/verify.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MessageComponent } from './message/message.component';
import {FocusDirective} from './login-service/FocusDirective';


@NgModule({
  declarations: [ LoginFacebookComponent, VerifyComponent, MessageComponent, FocusDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
  
  ]
})
export class SecurityModule {
}
