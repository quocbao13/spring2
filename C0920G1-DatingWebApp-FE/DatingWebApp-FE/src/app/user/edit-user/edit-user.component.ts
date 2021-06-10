import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { TokenService } from 'src/app/security/login-service/token.service';
import { LoadCssService } from 'src/app/service/load-css.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserHobby } from 'src/app/model/user/UserHobby';
import { Hobby } from 'src/app/model/user/Hobby';
import { UserNewInfoDtoRequest } from 'src/app/model/user/UserNewInfoDtoRequest';
import { District } from 'src/app/model/user/District';
import { Province } from 'src/app/model/user/Province';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Account } from 'src/app/model/user/Account';
import { DataService } from 'src/app/service/data.service';
import { UserEditInfoDto } from 'src/app/model/user/UserEditInfoDto';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public formEditUser: FormGroup;
  public userInfo: UserEditInfoDto;
  public hobbys: Hobby[];
  public districts: District[];
  public provinces: Province[];
  public accounts: Account[];
  public selection: Hobby[];
  public userHobbySet: UserHobby[] = [];
  public REGEX_FULLNAME =
    '^[\\w\\sa-zA-ZéẻẽẹêếểễệaáảãạăắẳẵặâấầẩẫóòỏõọôốổỗộơớờởỡúùủũụưứừữửựíìỉĩịýỳỷỹỵÉẺẼẸÊẾỂỄỆAÁẢÃẠĂẮẲẴẶÂẤẦẨẪÓÒỎÕỌÔỐỔỖỘƠỚỜỞỠÚÙỦŨỤƯỨỪỮỬỰÍÌỈĨỊÝỲỶỸỴ]{1,45}$';
  public REGEX_GENDER = '^(Male)|(Female)|(Nam)|(Nữ)|(Other)$';
  public REGEX_DESCRIPTION =
    '^[\\w\\s.?!,a-zA-Z0-9éẻẽẹêếểễệaáảãạăắẳẵặâấầẩẫóòỏõọôốổỗộơớờởỡúùủũụưứừữửựíìỉĩịýỳỷỹỵÉẺẼẸÊẾỂỄỆAÁẢÃẠĂẮẲẴẶÂẤẦẨẪÓÒỎÕỌÔỐỔỖỘƠỚỜỞỠÚÙỦŨỤƯỨỪỮỬỰÍÌỈĨỊÝỲỶỸỴ-]{1,45}$';
  public REGEX_PHONE = '^((090)|(093)|(079)|(078)|(077)|(076))\\d{7}$';
  public REGEX_MARRIED = '^(Độc thân)|(Đã kết hôn)|(Married)|(Single)|(Other)$';
  constructor(
    public userService: UserService,
    public tokenService: TokenService,
    public formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private dataService: DataService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}
  public userId: number;
  // public hobbyChoose: Hobby[];
  public avatarChoosen: string;
  public backgroundChoosen: string;
  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id;
    this.formEditUser = this.formBuilder.group({
      id: [],
      fullName: ['', Validators.required],
      education: [],
      gender: ['', Validators.required],
      descriptionUser: [],
      phone: [
        '',
        [
          Validators.compose([
            Validators.pattern('^0[0-9]{9}$'),
            Validators.required,
          ]),
        ],
      ],
      job: ['', Validators.required],
      married: ['', Validators.required],
      dayOfBirth: ['', Validators.required],
      datingGender: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      hobbyChoose: ['', Validators.required],
      deleteFlag: [],
      statsUserSetting: [],
      statusConfirm: [],
      statusOnOff: [],
      accounts: [],
    });
    // Lấy list tỉnh từ db
    this.userService.getAllProvince().subscribe((provinceListData) => {
      this.provinces = provinceListData;
    });
    // Lấy list hobby từ db
    this.userService.getAllHobby().subscribe((hobbyListData) => {
      this.hobbys = hobbyListData;
    });
    // Lấy list account từ db
    this.userService.getAllAccount().subscribe((data) => {
      this.accounts = data;
    });
    // Lấy user theo id
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.userInfo = data;
      this.formEditUser.patchValue(this.userInfo);
      console.log(this.userInfo.district.province);
      this.formEditUser.value.province = this.userInfo.district.province;
    });
  }
  // Lấy list huyện theo tỉnh
  getDistrict() {
    this.userService
      .getDistrictByProvinceId(this.formEditUser.value.province.id)
      .subscribe((districtListData) => {
        this.districts = districtListData;
      });
  }
  // Đẩy dữ liệu xuống db
  editUser() {
    if (this.formEditUser.value.id == this.userId) {
      if (this.formEditUser.valid) {
        this.userInfo = this.editUserInfo(this.userInfo, this.formEditUser);
        this.userService
          .editUser(this.userInfo.id, this.userInfo)
          .subscribe((data) => {
            this.openSnackBar('Lưu thành công!', 'Đóng');
          });
      } else(this.openSnackBar('Vui lòng xem lại thông tin!', 'Đóng'));
    }
  }
  // Gán dữ liệu từ form sang dto
  editUserInfo(
    userInfo: UserEditInfoDto,
    formEditUser: FormGroup
  ): UserEditInfoDto {
    userInfo.fullName = formEditUser.value.fullName;
    userInfo.education = formEditUser.value.education;
    userInfo.gender = formEditUser.value.gender;
    userInfo.descriptionUser = formEditUser.value.descriptionUser;
    userInfo.phone = formEditUser.value.phone;
    userInfo.job = formEditUser.value.job;
    userInfo.married = formEditUser.value.married;
    userInfo.dayOfBirth = formEditUser.value.dayOfBirth;
    userInfo.datingGender = formEditUser.value.datingGender;
    userInfo.district = formEditUser.value.district;
    userInfo.statsUserSetting = formEditUser.value.statsUserSetting;
    userInfo.statusConfirm = formEditUser.value.statusConfirm;
    userInfo.statusOnOff = formEditUser.value.statusOnOff;
    userInfo.accounts = this.accounts[this.userId - 1];
    let tempCount = 0;
    for (let hobbyChoose of this.selection) {
      this.userHobbySet.push(
        new UserHobby(
          tempCount,
          new Hobby(hobbyChoose.id, hobbyChoose.name, hobbyChoose.color)
        )
      );
      tempCount += 1;
    }
    tempCount = 0;
    userInfo.userHobbySet = this.userHobbySet;
    console.log(userInfo);
    return userInfo;
  }
  compareFunction(o1: any, o2: any) {
    return o1.name == o2.name && o1.id == o2.id;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
