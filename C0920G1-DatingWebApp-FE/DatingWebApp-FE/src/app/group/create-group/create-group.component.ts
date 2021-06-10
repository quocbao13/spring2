import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../service/group.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {Group} from "../../model/group";
import {TokenService} from "../../security/login-service/token.service";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  private idUser;
  public formCreate: FormGroup;
  public imgSrc: string = "../assets/img/icon-camera-2.png";
  selectedImg: any = null;
  group: Group;

  constructor(
    private tokenService: TokenService,
    public formBuilder: FormBuilder,
    public groupService: GroupService,
    public router: Router,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.idUser = this.tokenService.getUser().id;
    this.formCreate = this.formBuilder.group({
      name: ['', [Validators.required]],
      backgroundGroup: ['', [Validators.required]]
    })
  }

  //Lưu ảnh lên firebase
  createFirebase() {
    if (this.formCreate.controls.backgroundGroup.value != this.imgSrc) {
      const filePath = `backgroundGroup/${this.selectedImg.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((img) => {
            console.log(img);
            this.groupService.createGroup(this.idUser, this.formCreate.controls.name.value, img).subscribe(next => {
              this.router.navigateByUrl('group-list');
            });
          })
        })
      ).subscribe();
    } else {
      this.formCreate.controls.backgroundGroup.setValue(this.imgSrc);
      this.groupService.createGroup(this.idUser, this.formCreate.value, this.group.backgroundGroup).subscribe(next => {
      });
    }
  }

  //Lưu đối tượng group vào database
  createGroup(): void {
    this.createFirebase();
    console.log(this.formCreate.value)
    // this.groupService.createGroup(this.formCreate.value).subscribe(next => {
    //   this.router.navigateByUrl('group-list');
    // });
  }

  //Hiển thị ảnh lên màn hình thêm mới
  selectImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = "/assets/img/icon-camera-2.png";
      this.selectedImg = null;
    }
  }
}
