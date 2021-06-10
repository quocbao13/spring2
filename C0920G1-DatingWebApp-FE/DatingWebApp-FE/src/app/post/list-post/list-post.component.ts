import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../post.service';

import {CommentService} from '../../comment/comment.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {EditCommentComponent} from '../../comment/edit-comment/edit-comment.component';
import {TokenService} from '../../security/login-service/token.service';
import {DeleteCommentComponent} from '../../comment/delete-comment/delete-comment.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {comment} from '../../model/comment';

import {DataService} from '../../service/data.service';
import {Subscription} from 'rxjs';
import {CreatePostComponent} from '../create-post/create-post.component';
import {PostLikeService} from '../../post-like/post-like.service';
import {EditPostComponent} from "../edit-post/edit-post.component";


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {
  loading: boolean;

  formComment: FormGroup;
  public date = new Date();

  listPost: any = [];
  message: string;
  subscription: Subscription;
  selectedImage: any = null;
  imgSrc = null;
  isChuck = [];
  imgPost: any = [];
  listImgPost = [];
  isCheckImg = [];
  input: any;
  map: any = {};
  node: any;
  root = [];
  avatarUser: any;
  size = 3;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  commentDad = [];
  commentChild = [];
  public listImgShow = [];
  styleShowListImg = 'display:none';
  userName = this.tokenService.getUser().user.fullName;
  idUser = this.tokenService.getUser().id;
  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private storage: AngularFireStorage,
    public router: Router,
    private tokenService: TokenService,
    private dataService: DataService,
    private postLike: PostLikeService,
  ) {
  }


  ngOnInit(): void {
    const firstTime = localStorage.getItem('key');

    if(!firstTime){
      localStorage.setItem('key','loaded');
      location.reload()

    } else {
      localStorage.removeItem('key');
    }
    this.dataService.changeMessage('allllll');

    this.listPosth();

    this.formComment = this.fb.group({
      id: [''],
      content: [''],
      img: [null],
      date: [this.date],
      deleteFlag: [false],
    });
  }

  listPosth(){
    console.log(this.tokenService.getUser());
    this.avatarUser = this.tokenService.getUser().user.avatar;
    this.postService.listPost(this.size).subscribe((data) => {
      console.log(data);
      this.listPost = data;

      console.log(this.listPost);
      console.log(this.listPost[0].imgSet[0].url);
      for (let i = 0; i < this.listPost.length; i++) {
        for (let j = 0; j < this.listPost[i].commentSet.length; j++) {
          console.log(this.listPost[i].commentSet.id);
          this.listPost[i].commentSet.sort((a,b) => b.id - a.id);
          console.log(this.listPost[i].commentSet[j].id);
          if (this.listPost[i].commentSet[j].img != null) {
            this.isChuck[j] = true;
          } else {
            this.isChuck[j] = false;
          }
        }
      }

      for (let i = 0; i < this.listPost.length; i++) {
        this.classNameLike[i] = 'far fa-heart';
        this.styleLike[i] = 'color: black';
        for (let j = 0; j < this.listPost[i].postLikeSet.length; j++) {
          if (this.tokenService.getUser().id == this.listPost[i].postLikeSet[j].user.id) {
            console.log('đây');
            this.classNameLike[i] = 'fas fa-heart';
            this.styleLike[i] = 'color: #dc3545';
          }

        }
      }

      this.listPost2(this.listPost);

    });
  }

  //Khanh
  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      autoFocus: false,
      width: '500px',
      maxHeight: '90vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(data => {
      if(this.postService.getStatus()){
        this.ngOnInit();
      }
    })
  }

  //Khanh
  openDialogEditPost(id){
    this.postService.findById(id).subscribe(result => {
      const dialogRef = this.dialog.open(EditPostComponent, {
        autoFocus: false,
        width: '500px',
        data: {data1: result},
        maxHeight: '90vh',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(data => {
        if(this.postService.getStatus()){
          this.ngOnInit();
        }
      });
    });
  }

  //phuc
  increaseSize() {
    this.size += 3;
    this.postService.listPost(this.size).subscribe((data) => {
      this.listPost = data;


      console.log(data);
      for (let i = 0; i < this.listPost.length; i++) {
        for (let j = 0; j < this.listPost[i].commentSet.length; j++) {
          // this.listPost[i].commentSet.sort((a,b) => a.commentSet[j].id.localeCompare(b.commentSet[j].id));
          if (this.listPost[i].commentSet[j].img != null) {
            this.isChuck[j] = true;
          } else {
            this.isChuck[j] = false;
          }
        }
      }

      for (let i = 0; i < this.listPost.length; i++) {
        this.classNameLike[i] = 'far fa-heart';
        this.styleLike[i] = 'color: black';
        for (let j = 0; j < this.listPost[i].postLikeSet.length; j++) {
          if (this.tokenService.getUser().id == this.listPost[i].postLikeSet[j].user.id) {
            console.log('đây');
            this.classNameLike[i] = 'fas fa-heart';
            this.styleLike[i] = 'color: #dc3545';
          }
        }
      }



    }, error => {

    }, () => {
      this.listPost2(this.listPost);
    });
  }

  // list
  listPost2(list) {
    this.commentDad = [];
    this.commentChild =[];
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].commentSet.length; j++) {
        this.node = list[i].commentSet[j];
        if (this.node.comment == null) {

          this.commentDad.push(this.node);

        } else {

          this.commentChild.push(this.node);
        }
      }
    }

    list.commentSet = this.commentDad;

  }


  // tao commentPipe
  createComment(idPost, formValue) {

    if (this.checkInput(formValue)) {
      this.datePipe.transform(this.date);
      let idUser = this.tokenService.getUser().id;


      if (this.imgSrc !== null) {
        const filePath = `test/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue.img = url;
              this.commentService.createComment(formValue, idPost, idUser).subscribe(data => {
                this.listPosth();
                setTimeout(() => {
                }, 400);
              }, error => {

                if (error.status === 400) {

                } else if (error.status === 404) {

                }
              }, () => {
                this.commentDad;
              });
            });
          })).subscribe();
      } else {
        this.commentService.createComment(formValue, idPost, idUser).subscribe(data => {
          this.listPosth();
        }, error => {

          if (error.status === 400) {

          }
        }, () => {

        });
      }


    }
    this.imgSrc = null;
    // (<HTMLInputElement>document.getElementById(idPost)).value = '';
    this.formComment = this.fb.group({
      id: [''],
      content: [''],
      img: [null],
      date: [this.date],
      deleteFlag: [false],
    });
  }


//Xem trước ảnh trước khi up file
  isCheck = [];

  showPreview(event: any, id) {
    console.log(id);
    if (event.target.files && event.target.files[0]) {
      this.isCheck[id] = true;
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = null;
      this.selectedImage = null;
    }
  }

  // edit commentPipe
  openDialogEdit(idToPass, idPost) {
    this.commentService.getCommentId(idToPass).subscribe(data => {
      const dialogRef = this.dialog.open(EditCommentComponent, {
        width: '700px',
        data: {
          idQ: idToPass,
          idP: idPost
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        this.listPosth();
      });
    });

  }

  // xoa commentPipe
  openDialogDelete(id) {
    let dialogRef = this.dialog.open(DeleteCommentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.commentService.deleteComment(id).subscribe(data => {
          this.listPosth();
        });
      }
    });
  }

  // tao commentPipe con
  createCommentParent(idPost, formValue, idComment) {
    if (this.checkInput(formValue)) {
      this.datePipe.transform(this.date);
      let idUser = this.tokenService.getUser().id;

      if (this.imgSrc !== null) {
        const filePath = `test/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue.img = url;
              this.commentService.createCommentParent(formValue, idPost, idUser, idComment).subscribe(data => {
                this.listPosth();
                setTimeout(() => {

                }, 400);
              }, error => {

                if (error.status === 400) {

                } else if (error.status === 404) {

                }
              }, () => {

              });
            });
          })).subscribe();
      } else {
        this.commentService.createCommentParent(formValue, idPost, idUser, idComment).subscribe(data => {
          this.listPosth();
        }, error => {

          if (error.status === 400) {

          }
        }, () => {

        });
      }
    }

    this.listPosth();
    this.imgSrc = null;
    this.formComment = this.fb.group({
      id: [''],
      content: [''],
      img: [null],
      date: [this.date],
      deleteFlag: [false],
    });
  }

  //Xem trước ảnh trước khi up file commentPipe parent
  isCheckParent = [];

  showPreviewParent(event: any, id) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.isCheckParent[id] = true;
    } else {
      this.imgSrc = null;
      this.selectedImage = null;
    }
  }

  // Check commentPipe con
  isCheckReply = [];

  CheckParent(idComment) {
    this.isCheckReply[idComment] = true;
  }

  // Checkcomment
  isCheckComment = [];

  checkComment(id) {
    this.isCheckComment[id] = true;
  }


  // ham khong cho rong
  checkInput(value): boolean {
    return !(this.imgSrc === null && value.content == '');
  }

  showListImg(img: string[]) {

    this.listImgShow = img;

    this.styleShowListImg = 'position: fixed; top: 120px; width: 1200px; height: 500px; left: 180px; display: block; index-z: 1000';
  }


  //Phúc
  //Hàm cho button chỉnh sửa question
  isShown = this.tokenService.getUser().id;


  deletePostLike(id: number) {
    this.postLike.deletePostLike(id).subscribe(data => {
      console.log(data);
    });
  }

  styleLike = [];
  classNameLike=[];

  createLike(idPost: number, index: number) {
    let idUser = this.tokenService.getUser().id;
    let checkLike = false;
    console.log(index);
    console.log(this.listPost[index].id);
    if (this.listPost[index].postLikeSet.length > 0) {
      for (let j = 0; j < this.listPost[index].postLikeSet.length; j++) {
        console.log(this.listPost[index].postLikeSet[j].user);
        if (idUser == this.listPost[index].postLikeSet[j].user.id) {
          console.log(this.listPost[index].postLikeSet[j].id);
          this.postService.deleteLike(this.listPost[index].postLikeSet[j].id).subscribe();
          this.classNameLike[index] = 'far fa-heart';
          this.styleLike[index] = 'color: black';
          console.log('xoa');
          checkLike = true;
          this.listPosth();
          break;
        }
      }
      if (!checkLike) {
        this.postService.createLike(idUser, idPost).subscribe(data => {
          console.log('oke1');
          this.classNameLike[index] = 'fas fa-heart';
          this.styleLike[index] = 'color: #dc3545';
          this.listPosth();
        });
      }
    } else {
      this.postService.createLike(idUser, idPost).subscribe(data => {
        console.log('oke2');
        this.classNameLike[index] = 'fas fa-heart';
        this.styleLike[index] = 'color: #dc3545';
        this.listPosth();
      });
    }
  }

}
