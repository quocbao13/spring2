import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDatingComponent } from './list-dating/list-dating.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgxLoadingModule} from "ngx-loading";
import { DatingPipe } from './list-dating/dating.pipe';
import {AppModule} from "../app.module";
import {HeaderComponent} from "../header/header.component";



@NgModule({
  declarations: [
    ListDatingComponent,
    DatingPipe,
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NgxLoadingModule.forRoot({}),
    ]
})
export class DatingModule { }
