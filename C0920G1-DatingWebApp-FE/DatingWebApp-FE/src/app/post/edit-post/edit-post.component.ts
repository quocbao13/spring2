import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {PostService} from '../post.service';
import {HttpClient} from '@angular/common/http';
import {TokenService} from "../../security/login-service/token.service";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  toggled: boolean;
  message: '';
  emotion: string;
  content: string;
  images = [];
  listImage = [];
  downloadURL;
  listImageSaveDb = '';
  fb;
  count = 1;
  post;
  myForm = new FormGroup({
    status: new FormControl('0'),
    content: new FormControl('' ),
    file: new FormControl('' ),
    fileSource: new FormControl('')
  });
  private base64textString: string;
  private myFile: Blob;
  avatarUser: string;
  fullNameUser: string;
  loading: boolean;
  emoji: boolean;
  messageErrorImage: string;
  idUser;
  constructor(public dialogRef: MatDialogRef<EditPostComponent>,
              private tokenService: TokenService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private storage: AngularFireStorage,
              private postService: PostService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log(this.data.data1);
    this.post = this.data.data1;
    this.post.img1 = this.post.img1.split(' ');
    this.avatarUser = this.tokenService.getUser().user.avatar;
    this.fullNameUser = this.tokenService.getUser().user.fullName;
    this.idUser = this.tokenService.getUser().user.id;
  }
  activeEmoji(){
    this.emoji = !this.emoji;
  }
  handleSelection($event: any, element) {
    console.log($event);
    this.message += $event.emoji.native;
    this.emotion = $event.emoji.native;
    this.content = element.value + this.emotion ;
  }
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.listImage.push(event.target.files[i]);
        console.log(event);
        const reader = new FileReader();
        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.myForm.patchValue({
            fileSource: this.images
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  uploadFile(file){
    const n = Date.now();
    console.log(file);
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              console.log(this.listImageSaveDb);
              if (this.count === this.images.length){
                this.listImageSaveDb = this.listImageSaveDb + this.fb;
              }else {
                this.listImageSaveDb = this.listImageSaveDb + this.fb + ' ';
              }
              console.log(this.listImageSaveDb);
              if (this.count === this.images.length){
                console.log(this.listImageSaveDb);
                const createDate = new Date();
                // tslint:disable-next-line:max-line-length
                this.postService.editPost(this.idUser, this.post.id, this.listImageSaveDb, this.myForm.controls.content.value, this.myForm.controls.status.value, createDate).subscribe(data => {
                  this.postService.setStatus();
                  this.loading = false;
                  this.dialogRef.close();
                });
              }else {
                this.count++;
              }
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  submit(){
    this.loading = true;
    let checkInvalidImg = false;
    console.log(this.images.length === 0);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.post.img1.length; i++){
      if (i === this.post.img1.length - 1 && this.images.length === 0){
        this.listImageSaveDb = this.listImageSaveDb + this.post.img1[i];
      }else {
        this.listImageSaveDb = this.listImageSaveDb + this.post.img1[i] + ' ';
      }
    }
    console.log(this.listImageSaveDb === '');
    if (this.images.length === 0 && this.listImageSaveDb !== ''){
      const createDate = new Date();
      // tslint:disable-next-line:max-line-length
      this.postService.editPost(this.idUser, this.post.id, this.listImageSaveDb, this.myForm.controls.content.value, this.myForm.controls.status.value, createDate).subscribe(data => {
        this.postService.setStatus();
        this.loading = false;
        this.dialogRef.close();
      });
    }else if (this.images.length === 0 && this.listImageSaveDb === ''){
      const createDate = new Date();
      // tslint:disable-next-line:max-line-length
      this.postService.editPost(this.idUser, this.post.id, '', this.myForm.controls.content.value, this.myForm.controls.status.value, createDate).subscribe(data => {
        this.postService.setStatus();
        this.loading = false;
        this.dialogRef.close();
      });
    }
    else {
      // for (const file of this.listImage){
      //   this.uploadFile(file);
      // }
      for (const file of this.images){
        if (file.slice(5, 10) !== 'image'){
          checkInvalidImg = true;
        }
      }
      for (const file of this.images){
        if (!checkInvalidImg){
          this.myFile = this.dataURItoBlob(file);
          this.uploadFile(this.myFile);
        }else {
          this.messageErrorImage = 'file không phải là ảnh';
          this.loading = false;
        }
      }
    }
  }
  deleteImage(url){
    this.images = this.images.filter((a) => a !== url);
  }
  deleteImage1(url){
    this.post.img1 = this.post.img1.filter((a) => a !== url);
  }
  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }
  close(){
    this.dialogRef.close()
  }
}
