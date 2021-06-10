import {Component, OnDestroy, OnInit} from '@angular/core';
import {FacebookLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {TokenService} from '../login-service/token.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TokenDto} from '../login-service/token-dto';
import {OauthService} from '../login-service/oauth.service';
import * as firebase from 'firebase';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {PostService} from '../../post/post.service';
import {DataService} from '../../service/data.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HeaderComponent} from '../../header/header.component';

// ChienTM
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

//
@Component({
  selector: 'app-login-facebook',
  templateUrl: './login-facebook.component.html',
  styleUrls: ['./login-facebook.component.scss']
})
export class LoginFacebookComponent implements OnInit {
  nickname = '';
  ref = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();
  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean;
  fullName: string;
  message: string;
  subscription: Subscription;
  roles: string[] = [];
  statusConfirm: boolean;
  checkLoginFb: boolean;
  constructor(
    private postService: PostService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService,
    private tokenService: TokenService,
    private dataService: DataService,
    headerComponent: HeaderComponent,
    public dialogRef: MatDialogRef<LoginFacebookComponent>,
    private matSnackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.checkLoginFb = false;
    this.subscription = this.dataService.currentMessage.subscribe(message => this.message = message);
    this.socialAuthService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
      }
    );
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);
        this.socialUser = data;
        const tokenFacebook = new TokenDto(this.socialUser.authToken);
        this.oauthService.facebook(tokenFacebook).subscribe(
          res => {
            console.log(res);
            this.tokenService.setToken(res.token);
            this.tokenService.saveUser(res);
            //ChienTM------------------------------------
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
            this.isLogged = true;
            this.roles = this.tokenService.getUser().roles;
            this.statusConfirm = this.tokenService.getUser().user.statusConfirm;

            this.closeDialog();
            console.log(this.statusConfirm);
            if (this.statusConfirm == true) {
              this.dataService.changeMessage('Hello from Sibling');
              this.router.navigate(['post-list']);
            } else {
              if (this.roles[0] === 'ROLE_CUSTOMER' || this.roles[0] === 'ROLE_ADMIN') {
                this.router.navigateByUrl('new-info');
              }
            }
          }, error => {
            this.dataService.changeMessage('');
            this.closeDialog();
            console.log(error);
            this.signOut();
            this.matSnackBar.open('Đăng nhập thất bại!', 'Ok', {
              duration: 4000,
            });
          },
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  // tslint:disable-next-line:typedef
  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signOut(): void {
    this.socialAuthService.signOut().then(
      data => {
        this.tokenService.logOut();
        this.isLogged = false;
      }
    );
  }

}
