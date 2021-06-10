import {Component, Inject, OnInit} from '@angular/core';
import {CommentService} from '../comment.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  public formEdit: FormGroup;
  public date = new Date();
  selectedImg: any;
  imgSrc = null;
  selectedImage: any;
  isCheck = false;
  constructor(private commentService: CommentService,private fb: FormBuilder,
              private route: ActivatedRoute, private router: Router,  private datePipe: DatePipe, private storage: AngularFireStorage,
              @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditCommentComponent>,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.pickComment();
  }

  pickComment(){
    this.datePipe.transform(this.date);
    this.formEdit = this.fb.group({
        id: [''],
        content: [''],
        img: [''],
        date: [this.date],
        deleteFlag: [false],
        user:[]
    });
    const id = this.data.idQ;
    this.commentService.getCommentId(id).subscribe(data => {
      this.imgSrc = data.img;
      if(this.imgSrc !== null){
        this.isCheck = true;
      }
      else {
        this.isCheck = false;
      }
      this.formEdit.patchValue(data);
    });
  }

  updateComment(formValue){
    if (this.checkInput(formValue)) {
      if (this.formEdit.controls.img.value != this.imgSrc) {
        const filePath = `test/${this.selectedImg.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        console.log(filePath);
        console.log(fileRef);
        console.log(this.selectedImg);
        this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(img => {
              this.formEdit.controls.img.setValue(img);
              this.commentService.updateCommentById(this.data.idQ, this.formEdit.value, this.data.idP).subscribe(data => {

                setTimeout(() => {

                }, 400);
              }, error => {

                if (error.status === 400) {

                } else if (error.status === 404) {

                }
              }, () => {

              });
            });
          })).subscribe()
      } else {
        this.formEdit.controls.img.setValue(this.imgSrc);
        this.commentService.updateCommentById(this.data.idQ, this.formEdit.value, this.data.idP).subscribe(data => {
        }, error => {

          if (error.status === 400) {

          }
        }, () => {

        });
      }

    }
  }


  // Xem trước hình ảnh
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImg = event.target.files[0];
      let formData = new FormData();
      formData.append("file", this.selectedImg);
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
      this.isCheck = true;
    } else {
      this.imgSrc = this.formEdit.controls.img;
      this.selectedImg = null;
    }
  }

  // ham khong cho rong
  checkInput(value): boolean {
    return !(this.imgSrc === null && value.content == "");
  }

}
