import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group.service';

import {Token} from '@angular/compiler';
import {CreatePostComponent} from '../../post/create-post/create-post.component';
import {MatDialog} from '@angular/material/dialog';
import {DetailGroup} from 'src/app/model/DetailGroup';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupDetailService} from 'src/app/service/group-detail.service';
import {TokenService} from 'src/app/security/login-service/token.service';
import {UserService} from '../../service/user.service';
import {AdminGroupDTO} from '../../model/AdminGroupDTO';
import {UserDTO} from '../../chat/DTO/UserDTO';
import {Observable, Subscription} from 'rxjs';
import {Group} from '../../model/group';
import {EditPostComponent} from '../../post/edit-post/edit-post.component';
import {PostService} from '../../post/post.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {EditCommentComponent} from '../../comment/edit-comment/edit-comment.component';
import {DeleteCommentComponent} from '../../comment/delete-comment/delete-comment.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireStorage} from '@angular/fire/storage';
import {CommentService} from '../../comment/comment.service';
import {PostLikeService} from '../../post-like/post-like.service';


@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.scss']
})
export class DetailGroupComponent implements OnInit {
  listPost: any = [];
  loading = false;
  groupDetail: DetailGroup;
  idGroup: number;
  checkJoinGroup: Boolean = false;
  checkIdAdminGroup: Boolean = false;
  users: any;
  avatar: string;
  idUserCurrent: number;
  isShown = this.tokenService.getUser().id;
  public listImgShow = [];
  styleShowListImg = 'display:none';
  isCheckComment = [];
  avatarUser: any;
  formComment: FormGroup;
  public date = new Date();
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
  size = 3;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  commentDad = [];
  commentChild = [];

  constructor(private groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              private groupDetailService: GroupDetailService,
              private token: TokenService,
              private tokenService: TokenService,
              private postService: PostService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private storage: AngularFireStorage,
              public router: Router,
              private commentService: CommentService,
              private postLike: PostLikeService,
  ) {
  }


  ngOnInit(): void {
    this.idUserCurrent = this.token.getUser().id;
    this.avatar = this.token.getUser().user.avatar;
    this.avatarUser = this.tokenService.getUser().user.avatar;
    this.activatedRoute.params.subscribe(data => {
      this.idGroup = Number(data.id);
      this.getAllUserInGroup(this.idGroup);
      this.getGroupById(this.idGroup);
      this.getAllPostInGroup(this.idGroup);
    });
    this.formComment = this.fb.group({
      id: [''],
      content: [''],
      img: [null],
      date: [this.date],
      deleteFlag: [false],
    });
  }

  getAllUserInGroup(id) {
    this.groupDetailService.getAllUserInGroup(id).subscribe(data => {
        this.users = data;
        this.idUserCurrent = this.token.getUser().id;
        for (let user of this.users) {
          if (this.idUserCurrent == user.id) {
            this.checkJoinGroup = true;
          }
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getGroupById(id: number) {
    this.groupDetailService.getGroupById(id).subscribe(data => {
        this.groupDetail = data;
        this.checkAdminGroup(this.idUserCurrent, this.groupDetail.adminGroupDTO.id);
      }, error => {
        console.log(error);
      }
    );
  }

  getAllPostInGroup(id) {
    this.groupDetailService.getAllPostInGroup(id).subscribe(data => {
        this.listPost = data;
      }, error => {
        console.log(error);
      }
    );
  }

  //khanh
  openDialog(id: number): void {
    this.loading = true;
    this.groupDetailService.getGroupById(id).subscribe(result => {
      const dialogRef = this.dialog.open(CreatePostComponent, {
        autoFocus: false,
        width: '500px',
        maxHeight: '90vh',
        data: {data1: result},
      });
      dialogRef.afterClosed().subscribe(data => {
        this.ngOnInit();
      });
    });
    this.loading = false;

  }

  checkAdminGroup(idUser: number, idAdmin: number) {
    if (idUser == idAdmin) {
      this.checkIdAdminGroup = true;
      this.checkJoinGroup = true;
    }
  }

  joinGroup(idUser: number, idGroup: number) {
    this.groupDetailService.joinGroup(idUser, idGroup).subscribe(() => {
      this.ngOnInit();
      this.checkJoinGroup = true;
    });
  }

  outGroup(idUser: number, idGroup: number) {
    this.groupDetailService.outGroup(idUser, idGroup).subscribe(() => {
      this.ngOnInit();
      this.checkJoinGroup = false;
    });
  }

  openDialogEditPost(id) {
    this.postService.findById(id).subscribe(result => {
      const dialogRef = this.dialog.open(EditPostComponent, {
        autoFocus: false,
        width: '500px',
        data: {data1: result},
        maxHeight: '90vh',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(data => {
        if (this.postService.getStatus()) {
          this.ngOnInit();
        }
      });
    });
  }

  increaseSize() {
    this.size += 3;
    this.postService.listPost(this.size).subscribe((data) => {
      this.listPost = data;


      console.log(data);
      for (let i = 0; i < this.listPost.length; i++) {
        for (let j = 0; j < this.listPost[i].commentSet.length; j++) {
          if (this.listPost[i].commentSet[j].img != null) {
            this.isChuck[j] = true;
          } else {
            this.isChuck[j] = false;
          }
        }
      }

      this.listPost2(this.listPost);

    });
  }

  // list
  listPost2(list) {
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

  //up nhieu anh tren bai post


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
                window.location.reload();
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
          window.location.reload();
        }, error => {

          if (error.status === 400) {

          }
        }, () => {

        });
      }


    }
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
        data: {
          idQ: idToPass,
          idP: idPost
        },
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    });
  }

  // xoa commentPipe
  openDialogDelete(id) {
    let dialogRef = this.dialog.open(DeleteCommentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.commentService.deleteComment(id).subscribe(data => {
          this.snackBar.open('Đã xóa thành công', 'Chấp nhận');
        });
      }
    });
  }

  // tao commentPipe con
  createCommentParent(idPost, formValue, idComment) {
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

      }, error => {

        if (error.status === 400) {

        }
      }, () => {

      });
    }


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


  deletePostLike(id: number) {
    this.postLike.deletePostLike(id).subscribe(data => {
      console.log(data);
    });
  }
}
