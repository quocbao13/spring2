import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenService} from '../login-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthService implements CanActivate{

  constructor(private tokenStorageService: TokenService,
              private router: Router,
              private matSnackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();

    if (token == null) {
      this.router.navigateByUrl('/login');
      this.matSnackBar.open('Bạn cần đăng nhập để thực hiện tác vụ!', 'Ok', {
        duration: 4000,
      });
      return false;
    } else if (!this.isRole()) {
      this.router.navigateByUrl('/login');
      this.matSnackBar.open('Bạn không có quyền truy cập trang này!', 'Ok', {
        duration: 4000,
      });
      return false;
    } else if (this.tokenStorageService.getUser().user.statusConfirm != true) {
      this.router.navigateByUrl('/new-info');
      this.matSnackBar.open('Vui lòng nhập đầy đủ thông tin!', 'Ok', {
        duration: 4000,
      });
      return false;
    } else {
      return true;
    }
  }
  isRole() {
    const tokenPayload = this.tokenStorageService.getAuthorities();
    for (const role of tokenPayload) {
      if (role === 'ROLE_CUSTOMER') {
        return true;
      }
    }
    return false;
  }
}
