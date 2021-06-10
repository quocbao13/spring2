import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {TokenService} from '../login-service/token.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private tokenStorageService: TokenService,
              private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();
    const currentUser =  this.tokenStorageService.getUser();
    if (token !== null) {
      this.router.navigateByUrl('/login');
      return false;
    }else {
      return true;
    }
  }
}
