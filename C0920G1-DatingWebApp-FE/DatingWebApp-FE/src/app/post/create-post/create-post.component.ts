import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireStorage} from "@angular/fire/storage";
import {PostService} from "../post.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {finalize} from "rxjs/operators";
import {TokenService} from "../../security/login-service/token.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  toggled: boolean;
  message: '';
  emotion: string;
  content: string;
  images = [];
  listImage = [];
  downloadURL;
  fb;
  count = 1;
  listImageSaveDb = '';
  loading = false;
  idGroup;
  myForm = new FormGroup({
    status: new FormControl('0'),
    content: new FormControl('', [Validators.required] ),
    file: new FormControl('', [Validators.required] ),
    fileSource: new FormControl('')
  });
  private myFile: Blob;
  messageErrorImage: string;
  avatarUser: string;
  fullNameUser: string;
  emoji: boolean;
  idUser;
  @ViewChild('element') set elementRef(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.focus();
    }
  }
  constructor(
    private tokenService: TokenService,
    private storage: AngularFireStorage,
    private postService: PostService,
    private route: Router,
    public dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.avatarUser = this.tokenService.getUser().user.avatar;
    this.fullNameUser = this.tokenService.getUser().user.fullName;
    this.idUser = this.tokenService.getUser().user.id;
    console.log(this.data)
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
                if (this.data == null){
                  this.idGroup = 1
                }else {
                  this.idGroup = this.data.data1.group.id
                }
                this.postService.savePost(this.idGroup, this.idUser, this.listImageSaveDb, this.myForm.controls.content.value, this.myForm.controls.status.value, createDate).subscribe(data => {
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
    let checkInvalidImg = false;
    if (this.listImage.length === 0) {
      this.loading = true;
      const createDate = new Date();
      if (this.data == null){
        this.idGroup = 1
      }else {
        this.idGroup = this.data.data1.group.id
      }
      this.postService.savePost(this.idGroup, this.idUser,'', this.myForm.controls.content.value, this.myForm.controls.status.value, createDate).subscribe(data => {
        this.loading = false;
        this.postService.setStatus();
        this.dialogRef.close();
      });
    }else {
      for (const file of this.images){
        if (file.slice(5, 10) !== 'image'){
          checkInvalidImg = true;
        }
      }
      for (const file of this.images){
        if (!checkInvalidImg){
          this.loading = true;
          this.myFile = this.dataURItoBlob(file);
          this.uploadFile(this.myFile);
        }else {
          this.messageErrorImage = 'file không phải là ảnh';
          console.log(this.messageErrorImage);
        }
      }
      console.log(this.images);
    }
  }
  deleteImage(url){
    console.log(this.images);
    this.images = this.images.filter((a) => a !== url);
    console.log(this.images);
    console.log(this.listImage);
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
