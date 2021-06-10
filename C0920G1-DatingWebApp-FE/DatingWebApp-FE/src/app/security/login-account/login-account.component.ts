import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {LoginFacebookComponent} from '../login-facebook/login-facebook.component';
import {TokenService} from '../login-service/token.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../login-service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import {ErrorStateMatcher} from '@angular/material/core';
import * as firebase from 'firebase';
import {DataService} from '../../service/data.service';
import {MessageComponent} from '../message/message.component';

// ChienTM
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.scss']
})

export class LoginAccountComponent implements OnInit {
  nickname = '';
  ref = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();
  formLogin: FormGroup;
  formRegister: FormGroup;
  userLogged: SocialUser;
  isLogged: boolean;
  username: string;
  listError: any = "";
  checkPass: string = "";
  roles: string[] = [];
  message: string;
  registered = false;
  statusConfirm: boolean;
  public loading = false;
  isCheck: boolean;
  isCheck1: boolean;

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

    private dataService: DataService,

  ) {
  }


  ngOnInit(): void {
    this.dataService.changeMessage('');
    if (this.tokenService.getToken() == null) {
      const firstTime = localStorage.getItem('key');
      if(!firstTime){
        localStorage.setItem('key','loaded');
        location.reload()
      } else {
        localStorage.removeItem('key')
      }

      this.formLogin = this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9_.]+[a-z0-9]@([a-z0-9]+\\.)[a-z]+(|\\.[a-z]+)$')]],
        password: ['', [Validators.required]],
      });
      this.formRegister = this.fb.group({
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9_.]+[a-z0-9]@([a-z0-9]+\\.)[a-z]+(|\\.[a-z]+)$')]],
        password: ['', Validators.required],
        checkPassword: ['', Validators.required],
        checkPolicy: ['', Validators.required]
      });
    } else {
      this.router.navigate(['post-list'])
    }
  }

  onSubmit(): void {
    this.authService.login(this.formLogin.value).subscribe(
      data => {
        console.log(data);
        this.formLogin.reset();
        this.loading = true;
        this.tokenService.setToken(data.token);
        this.tokenService.saveUser(data);
        this.isLogged = true;
        this.statusConfirm = this.tokenService.getUser().user.statusConfirm;
        this.roles = this.tokenService.getUser().roles;
        if (this.roles[0] === 'ROLE_CUSTOMER' || this.roles[0] === 'ROLE_ADMIN') {
          //ChienTM------------------------------------
          //ChienTM---------------------------------------------------------
          //ChienTM----------------------------------------------------------
          const newUser = {avatar: '', id: '', fullName: '', status: ''};
          newUser.avatar = this.tokenService.getUser().user.avatar;
          newUser.id = this.tokenService.getUser().user.id;
          newUser.fullName = this.tokenService.getUser().user.fullName;
          newUser.status = 'online';
          const createNewUser = firebase.database().ref('users/').push();
          createNewUser.set(newUser);
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
          console.log(this.tokenService.getUser());
          const id = this.tokenService.getUser().id;
          this.ref.orderByChild('id').equalTo(id).once('value', snapshot => {
            if (snapshot.exists()) {
              localStorage.setItem('nickname1', id);
              // firebase.database().ref('users/' + id + '/fullName'  ).update(this.tokenService.getUser());
            } else {
              const newUser = firebase.database().ref('users/').push();
              newUser.set(this.tokenService.getUser());
              localStorage.setItem('nickname1', id);
            }
          });
          //----------------------------------------
          // this.router.navigate(['/post-list']);
        }
        if (this.statusConfirm == true) {
          this.dataService.changeMessage('Hello from Sibling');
          this.router.navigate(['post-list']);
        } else {
          if (this.roles[0] === 'ROLE_CUSTOMER' || this.roles[0] === 'ROLE_ADMIN') {
            this.router.navigateByUrl('new-info');
          }
        }
      },
      error => {
        console.log(error);
        if (error.status === 400) {
          this.listError = error.error;
          this.isCheck = true;
        }
        if (error.status === 401) {
          this.checkPass = "Mật khẩu hoặc email không đúng, vui lòng nhập lại";
        }
        this.loading = false;
        this.isLogged = false;
      },
    )
  }

  onSubmitRegister(): void {
    console.log(this.formRegister.value);
    this.loading = true;
    this.authService.register(this.formRegister.value).subscribe(
      data => {

        this.formRegister.reset();
        this.loading = false;
        const dialogRef = this.dialog.open(MessageComponent, {
          data: 'Đăng ký tài khoản thành công, vui lòng vào email xác nhận đăng ký để tiếp tục .'
        });
        dialogRef.afterClosed();
        this.router.navigateByUrl('verify-account');
      },
      err => {
        if (err.status === 400) {
          this.listError = err.error;
          this.isCheck1 = true;
        }
        this.isLogged = false;
        this.loading = false;
      },
    );
  }

  openDialogFacebook() {
    const dialogRef = this.dialog.open(LoginFacebookComponent, {
      width: '30%',
      height: '30%',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSnackBar(message: string, action: string, classname: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      panelClass: [classname]
    });
  }

  checkInput(item) {
    if (this.listError !== "") {
      this.isCheck = false;
      this.isCheck1 = false;
      switch (item) {
        case "email":
          this.listError.email = "";
          this.listError.existEmail = "";
          this.listError.message = "";
          break;
        case "password":
          this.listError.password = "";
          break;
        case "email1":
          this.listError.email = "";
          break;
        case "password1":
          this.listError.password = "";
          break;
      }
    }
  }
}
