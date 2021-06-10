import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../security/login-service/token.service";
import {UserNewInfoDtoRequest as UserEditInfoDto, UserNewInfoDtoRequest} from "../model/user/UserNewInfoDtoRequest";
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions: any;
  public API = 'http://localhost:8080/api/profile';
  constructor(private http: HttpClient
    , private tokenStorage: TokenService
    , private _snackBar: MatSnackBar,) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200'
      , 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
// code cua thinh xóa nộp 50k
// Thinh:FUNC gửi data xuống be
  editUser(id: number, user:UserEditInfoDto ): Observable<any> {
    return this.http.put(this.API +'/'+ id + '/edit-info', user, this.httpOptions);
  }
// Thinh:lấy user bằng id
  getUserById(id): Observable<any> {
    return this.http.get(this.API +'/' + id + '/edit-info', this.httpOptions);
  }
// Thinh:lấy huyện thông qua id tỉnh
  getDistrictByProvinceId(id): Observable<any> {
    return this.http.get(this.API +'/' + id + '/district', this.httpOptions);
  }
  // Thinh:lấy tất cả Account
  getAllAccount(): Observable<any> {
    return this.http.get(this.API + '/get-account', this.httpOptions);
  }
  // --------------------------------
  /*_-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_
     Hiếu làm service phần này, vui lòng không thay đổi
     Create by: Hiếu
     Effective: Lấy danh sách api tất cả  Province từ backend lên
     Date created: 2021-04-07
  */
  getAllProvince(): Observable<any> {
    return this.http.get(this.API + '/province', this.httpOptions);
  }
  /*
       Create by: Hiếu
       Effective: Lấy danh sách api tất cả District từ backend lên
       Date created: 2021-04-07
  */
  getAllDistrict(): Observable<any> {
    return this.http.get(this.API + '/district', this.httpOptions);
  }
  /*
       Create by: Hiếu
       Effective: Lấy danh sách api tất cả Hobby từ backend lên
       Date created: 2021-04-07
  */
  getAllHobby(): Observable<any> {
    return this.http.get(this.API + '/hobby', this.httpOptions);
  }
  /*
       Create by: Hiếu
       Effective: Truyền id user xuống để lấy api userNewInfoDto từ back end lên
       Date created: 2021-04-07
  */
  getUserByUserId(id: number): Observable<any> {
    console.log(this.tokenStorage.getToken());
    return this.http.get(this.API + "/" + id + "/new-info", this.httpOptions);
  }
  /*
       Create by: Hiếu
       Effective: Lưu avatar url của user lần đầu
       Date created: 2021-04-07
  */
  updateUserAvatarFirstTime(id: number, userAvatarUrl: string): Observable<any> {
    return this.http.put(this.API + "/" + id + "/new-info/avatar", userAvatarUrl, this.httpOptions);
  }
  /*
       Create by: Hiếu
       Effective: Lưu background url của user lần đầu
       Date created: 2021-04-07
  */
  updateUserBackgroundFirstTime(id: number, userBackgroundUrl: string): Observable<any> {
    return this.http.put(this.API + "/" + id + "/new-info/background", userBackgroundUrl, this.httpOptions);
  }
  /*
     Create by: Hiếu
     Effective: Truyền id user xuống để lấy api userNewInfoDto từ back end lên
     Date created: 2021-04-07
*/
  updateNewInforUser(id: number, userNewInfoDto: UserNewInfoDtoRequest): Observable<any> {
    return this.http.put(this.API + "/" + id + "/new-info", userNewInfoDto, this.httpOptions);
  }
  /*
       Create by: Hiếu & Thịnh
       Effective: Hiện snackbar massage thông báo lên
       Date created: 2021-04-07
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
  }
//_-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_
  //API trang
  setupStatusUserSetting(id:number, data:string){
    return this.http.put(this.API +  '/setupStatusUserSetting/' + id, data, this.httpOptions);
  }
  setupStatus(id:number, data:string){
    return this.http.put(this.API +  '/setupStatus/' + id, data,  this.httpOptions);
  }
  getStatusUserSetting(id: number){
    return this.http.get(this.API +  '/getStatusUserSetting/' + id,  this.httpOptions);
  }
  changePass(id:number, password:string){
    return this.http.put(this.API +  '/changePass/' + id, password,  this.httpOptions);
  }
  getAvatar(id:number): Observable<any> {
    return this.http.get(this.API +  '/getAvatar/' + id,  this.httpOptions);
  }
  updateAvatar(id:number, img:string){
    return this.http.put(this.API +  '/updateAvatar/' + id, img,  this.httpOptions);
  }
  //API trang
}
