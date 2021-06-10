import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMemberComponent } from './list-member/list-member.component';
import { HttpClientModule} from '@angular/common/http';
import { ListViolationsComponent } from './list-violations/list-violations.component';
import {RouterModule} from '@angular/router';
import {NgxLoadingModule} from 'ngx-loading';



@NgModule({
  declarations: [ListMemberComponent, ListViolationsComponent],
  exports: [
    ListMemberComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        NgxLoadingModule
    ]
})
export class AdminModule { }
