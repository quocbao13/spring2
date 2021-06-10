import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [EditCommentComponent, DeleteCommentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class CommentModule { }
