import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../login-service/auth.service';
import {MessageComponent} from '../message/message.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginAccountComponent} from '../login-account/login-account.component';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  nameError: string;
  message: string;
  emailConfirmed = false;
  token: string;
  loginComponent: LoginAccountComponent;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token != null) {
      this.confirmEmail();
    } else {
      this.router.navigateByUrl('login');
    }
  }

  confirmEmail() {
    this.authService.confirmAccount(this.token).subscribe(
      data => {
        const dialogRef = this.dialog.open(MessageComponent, {
          data: 'Xác nhận thành công, vui lòng đăng nhập để thực hiên tác vụ tiếp theo.'
        });
        dialogRef.afterClosed();
        setTimeout(function(){
          window.close();
        },3000);
      },
      error => {
        console.log(error);
        this.message = error.message;
      }
    );
  }

}
