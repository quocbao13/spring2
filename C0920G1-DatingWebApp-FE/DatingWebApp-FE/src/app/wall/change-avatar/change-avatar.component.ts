import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LyDialog } from '@alyle/ui/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImgCropperEvent } from '@alyle/ui/image-cropper';
import { finalize } from 'rxjs/operators';
import { CropperDialogComponent } from '../cropper-dialog/cropper-dialog.component';
import { TokenService } from 'src/app/security/login-service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChangeAvatarComponent implements OnInit {

  title = 'imgResizeProject';
  myFile: Blob;
  selectedImg: any = null;
  imgSrc;
  idUser;

  constructor(
    private _dialog: LyDialog,
    private _cd: ChangeDetectorRef,
    private storage: AngularFireStorage,
    private tokenService: TokenService,
    private userService: UserService,


  ) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.idUser=this.tokenService.getUser().id;

    this.userService.getAvatar(this.idUser).subscribe((data: any) => {
      console.log(data);
      if(data !== null){
        this.imgSrc = data[0];
        console.log(this.imgSrc);
      } else{
        this.imgSrc ='/assets/img/anh1.jpg'
      }
    })


  }

  openCropperDialog(event: Event) {
    // this.imgSrc = null!;
    this._dialog.open<CropperDialogComponent, Event>(CropperDialogComponent, {
      data: event,
      width: 320,
      disableClose: true
    }).afterClosed.subscribe((result?: ImgCropperEvent) => {
      if (result) {
        this.imgSrc = result.dataURL;
        this._cd.markForCheck();
        const reader = new FileReader();
        this.myFile = this.dataURItoBlob( this.imgSrc );
        reader.readAsDataURL(this.myFile);
        this.uploadFile(this.myFile)
      }
    });
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }

  uploadFile(file){
    var n = Date.now();
      const filePath = `RoomsImages/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`RoomsImages/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.selectedImg = fileRef.getDownloadURL();
            this.selectedImg.subscribe(url => {
              if (url) {
                this.imgSrc = url;
              }
              console.log(this.imgSrc);
              this.userService.updateAvatar(this.idUser, this.imgSrc).subscribe(next => {
                this.userService.openSnackBar('Đổi ảnh đại diện thành công!', 'Đóng');
              }, error => {
                this.userService.openSnackBar('Đổi ảnh đại diện thất bại!', 'Đóng');
              });

            });
          })
        )
        .subscribe();
    }

}
