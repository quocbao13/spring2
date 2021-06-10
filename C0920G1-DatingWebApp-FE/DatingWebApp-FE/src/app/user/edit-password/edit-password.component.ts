import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/security/login-service/token.service';
import { UserService } from 'src/app/service/user.service';
import { ConfirmPassComponent } from '../confirm-pass/confirm-pass.component';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  changePass: FormGroup;
  inputOldPass: string;
  inputNewPass: string;
  notificationInputNewPass: string;
  oldPassNewPass: string;
  notificationChangePassSuccess: string;
  notificationChangePassFail: string;
  idUser;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.changePass = this.formBuilder.group({
      oldPass: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,20}$')]],
      checkPass: this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: this.comparePassword })
    });
    this.idUser=this.tokenService.getUser().id;
  }

  comparePassword(c: AbstractControl) {
    const value = c.value;
    return (value.newPassword === value.confirmPassword) ? null : {
      passwordnotmatch: true
    };
  }

  updatePassword(){
    this.notificationChangePassSuccess = ''
    this.notificationChangePassFail = ''
    this.notificationInputNewPass = ''


    this.inputOldPass = this.changePass.value.oldPass;
    this.inputNewPass = this.changePass.value.checkPass.newPassword;

    if(this.inputOldPass == this.inputNewPass && this.inputNewPass !== ''){
      this.notificationInputNewPass = 'Mật khẩu mới đã trùng với mật khẩu cũ'
    } else{
      this.notificationInputNewPass = ''
      this.oldPassNewPass = this.inputOldPass + ',' + this.inputNewPass;

      this.userService.changePass(this.idUser, this.oldPassNewPass).subscribe((data:any) => {
        if(data === 1){
          // this.notificationChangePassSuccess = 'Đổi mật khẩu thành công'
          this.userService.openSnackBar('Đổi mật khẩu thành công!', 'Đóng');

        } else{
          this.notificationChangePassFail = 'Mật khẩu cũ không đúng'
          this.userService.openSnackBar('Mật khẩu cũ không đúng!', 'Đóng');

        }
      });

    }
  }

  openDialogCancel() {
    const dialogRef = this.dialog.open(ConfirmPassComponent, {
      width: '650px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
