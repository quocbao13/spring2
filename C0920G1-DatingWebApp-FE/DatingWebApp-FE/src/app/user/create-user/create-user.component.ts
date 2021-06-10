import {Component, OnDestroy, OnInit, SystemJsNgModuleLoader} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserNewInfoDtoRequest} from 'src/app/model/user/UserNewInfoDtoRequest';
import {Hobby} from 'src/app/model/user/Hobby';
import {District} from 'src/app/model/user/District';
import {Province} from 'src/app/model/user/Province';
import {UserService} from 'src/app/service/user.service';
import {TokenService} from 'src/app/security/login-service/token.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from "rxjs/operators";
import {UserHobby} from "../../model/user/UserHobby";
import {Router} from "@angular/router";
import {DataService} from '../../service/data.service';
import {Subscription} from 'rxjs';
import firebase from "firebase";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit, OnDestroy {
  public formUserNewInfo: FormGroup;
  public userNewInfoDto: UserNewInfoDtoRequest;
  public hobbys: Hobby[];
  public districts: District[];
  public provinces: Province[];
  public selection: Hobby[];
  minDate: Date;
  maxDate: Date;

  public loading: boolean = false;

  subscription: Subscription;
  message: string;

  // biến imgSrc là để luôn hiển thị ảnh mặc định bên image.component.html chỗ thẻ img làm mặc định
  public imgSrc: string = '/assets/img/image_placeholder.jpg';
  public imgBgr: string = '/assets/img/hinh-nen-4k-dep-3_124943.jpg';
  public selectedImgAvatar: any = null;
  public selectedImgBackground: any = null;

  /*  _-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_
      Hieu làm regex phần này
      Effective:
          - REGEX_FULLNAME là regex tên người, cho phép nhập tiếng việt, viết hoa, viết thường, dấu cách, từ 1-45 ký tự
          - REGEX_GENDER là regex giới tính, cho phép 4 chữ là Male, Female, Nam, Nữ
          - REGEX_DESCRIPTION là cho phép nhập tiếng việt, viết hoa, viết thường, dấu cách, số từ 0-9, dấu chấm, hỏi, chấm than, dấu phẩy
          - REGEX_PHONE là sdt có 10 số, bắt đầu với các con số như sau 090, 093, 079, 078, 077, 076
          - REGEX_MARRIED là chỉ có 2 giá trị là (Độc thân) và (Đã kết hôn)
  */

  public REGEX_FULLNAME = "^[^\\d\\t`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;\"'<>,.?\\/]{4,50}$";
  public REGEX_GENDER = "^(Nam|Nữ|Khác)$";
  public REGEX_DESCRIPTION = "^[^\\t\\-|\\\\{}\\[\\]\"\\/]{0,254}$";
  public REGEX_PHONE = "^0\\d{9}$";
  public REGEX_MARRIED = "^(Độc thân|Đã kết hôn|Khác)$";

  constructor(
    public userService: UserService,
    public tokenService: TokenService,
    public formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router,
    private dataService: DataService,
  ) {
    /*  Ngày tháng được chọn là nằm cách năm hiện tại là 100 năm, cho tới cách năm hiện tại là 15 năm  */
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 99, 11, 31);
    this.maxDate = new Date(currentYear - 15, 0, 1);
  }

  public userPresentId: number;

  ngOnInit(): void {
    this.dataService.changeMessage('');
    const firstTime = localStorage.getItem('key');
    if(!firstTime){
      localStorage.setItem('key','loaded');
      location.reload()
    } else {
      localStorage.removeItem('key')
    }
    this.userPresentId = this.tokenService.getUser().id;
    console.log("User present id: " + this.userPresentId);
    if (this.userPresentId == null) {
      this.router.navigateByUrl('login');
    }

    this.subscription = this.dataService.currentMessage.subscribe(message => this.message = message);

    this.userService.getAllProvince().subscribe(provinceListData => {
      this.provinces = provinceListData;
    });

    this.userService.getAllDistrict().subscribe(districtListData => {
      this.districts = districtListData;
    });

    this.userService.getAllHobby().subscribe(hobbyListData => {
      this.hobbys = hobbyListData;
    });

    this.formUserNewInfo = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(this.REGEX_FULLNAME)]],
      education: ['', [Validators.required, Validators.pattern(this.REGEX_FULLNAME)]],
      gender: ['', [Validators.required, Validators.pattern(this.REGEX_GENDER)]],
      descriptionUser: ['', [Validators.required, Validators.pattern(this.REGEX_DESCRIPTION)]],
      phone: ['', [Validators.required, Validators.pattern(this.REGEX_PHONE)]],
      job: ['', [Validators.required, Validators.pattern(this.REGEX_FULLNAME)]],
      married: ['', [Validators.required, Validators.pattern(this.REGEX_MARRIED)]],
      dayOfBirth: ['', [Validators.required]],
      datingGender: ['', [Validators.required, Validators.pattern(this.REGEX_GENDER)]],
      district: ['', [Validators.required]],
      province: ['', [Validators.required]],
      hobbyChoose: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      background: ['', [Validators.required]],
    });

    /*
        this.districts.forEach(district => {
          console.log("Số lượng quận, huyện theo tỉnh = " + this.districtsFollowProvince.length);
          if(this.districtsFollowProvince.length > 0){
            this.districtsFollowProvince.splice(0, this.districtsFollowProvince.length - 1);
          }
          if(district.province == this.provinceChose){
            console.log("Quận, huyện theo tỉnh được thêm vào= " + district);
            // this.districtsFollowProvince.push(district);

          }
        });
    */
    this.userService.getUserByUserId(this.userPresentId).subscribe(userNewInfoDtoData => {
      this.userNewInfoDto = userNewInfoDtoData;
      console.log('before set = ' + this.userNewInfoDto.fullName);
      this.userNewInfoDto = this.setDefaultValueforNewInfor(this.userNewInfoDto);
      console.log('after set = ' + this.userNewInfoDto.fullName);
      this.formUserNewInfo.patchValue(this.userNewInfoDto);
    });
  }

  setDefaultValueforNewInfor(userNewInfoDtoRequest: UserNewInfoDtoRequest) {
    userNewInfoDtoRequest.fullName = '';
    userNewInfoDtoRequest.education = '';
    userNewInfoDtoRequest.gender = 'Khác';
    userNewInfoDtoRequest.descriptionUser = '';
    userNewInfoDtoRequest.phone = '0900000000';
    userNewInfoDtoRequest.background = 'src/assets/img/background_user_default.jpg';
    userNewInfoDtoRequest.job = 'Hướng dẫn viên du lịch';
    userNewInfoDtoRequest.married = 'Khác';
    userNewInfoDtoRequest.datingGender = 'Khác';
    userNewInfoDtoRequest.avatar = 'src/assets/img/images_user_defalut.png';
    return userNewInfoDtoRequest;
  }

  showPreviewAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventChooseFile: any) => this.imgSrc = eventChooseFile.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImgAvatar = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/images_user_defalut.png';
      this.selectedImgAvatar = null;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showPreviewBackGround(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventChooseFile: any) => this.imgBgr = eventChooseFile.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImgBackground = event.target.files[0];
    } else {
      this.imgBgr = '/assets/img/background_user_default.jpg';
      this.selectedImgBackground = null;
    }
  }

  /*
    Create by: Hieu
    Effective: Tạo mới thông tin ban đầu, chia làm các trường hợp sau:
      + Case 1: Nhập sai hay không nhập ngày tháng -> không đạt, quay lại trang thêm mới
      + Case 2: Nhập sai 3 lần nên quay lại trang login
      + Case 3: Tên giống với tên mặc định là Johny Walker -> không đạt, quay lại trang thêm mới
      + Case 4: Họ tên bắt đầu hay kết thúc bằng ký tự trắng  -> không đạt, quay lại trang thêm mới
      + Case 5: Mô tả bản thân bắt đầu và kết thúc bằng khoảng trắng -> không đạt, quay lại trang thêm mới
      + Case 6: Không rơi vào các trường hợp trên thì bắt đầu up ảnh
  */

  public countFill = 0;

  createNewInfor() {

    console.log('Chuan bi update, full name = ' + this.userNewInfoDto.fullName + '\n');
    if (this.countFill > 3) {
      this.userService.openSnackBar("Nhập sai 3 lần nên sẽ quay lại trang login", "NOT");
      this.router.navigateByUrl('login');
    } else if (this.formUserNewInfo.value.dayOfBirth == null) {
      this.countFill += 1;
      this.userService.openSnackBar("Vui lòng nhập ngày tháng vào" +
        ", Lưu ý nhập sai 3 lần sẽ quay lại trang login", "NOT");
      // this.ngOnInit();
    } else if (this.formUserNewInfo.value.fullName.match('Vd: Johnny Walker')) {
      this.countFill += 1;
      this.userService.openSnackBar("Vui lòng nhập lại họ tên, không được dùng tên mặc định", "NOT");
      this.ngOnInit();
    } else if (this.formUserNewInfo.value.phone == null) {
      this.countFill += 1;
      this.userService.openSnackBar("Vui lòng nhập số điện thoại vào", "NOT");
      this.ngOnInit();
    } else if (this.formUserNewInfo.value.education.match('Vd: Tôn Đức Thắng university')) {
      this.userService.openSnackBar("Học vấn không được để là mặc định", "NOT");
      this.countFill += 1;
      this.ngOnInit();
    } else if (this.formUserNewInfo.value.education.charAt(0).match(' ')
      || this.formUserNewInfo.value.fullName.charAt(this.formUserNewInfo.value.fullName.length - 1).match(' ')) {
      this.userService.openSnackBar("Học vấn không được bắt đầu và kết thúc bằng khoảng trắng", "NOT");
      this.countFill += 1;
      this.ngOnInit();
    } else if (this.formUserNewInfo.value.fullName.charAt(0).match(' ')
      || this.formUserNewInfo.value.fullName.charAt(this.formUserNewInfo.value.fullName.length - 1).match(' ')) {
      this.userService.openSnackBar("Họ tên không được bắt đầu và kết thúc bằng khoảng trắng", "NOT");
      this.countFill += 1;
      this.ngOnInit();
    } else if (this.formUserNewInfo.value.descriptionUser.charAt(0).match(' ')
      || this.formUserNewInfo.value.descriptionUser.charAt(this.formUserNewInfo.value.descriptionUser.length - 1).match(' ')) {
      this.countFill += 1;
      this.userService.openSnackBar("Mô tả bản thân không được bắt đầu và kết thúc bằng khoảng trắng", "NOT");
      this.ngOnInit();
    } else if (this.selection == undefined) {
      this.countFill += 1;
      this.userService.openSnackBar("Bạn vẫn chưa chọn sở thích", "NOT");
      this.ngOnInit()
    }

    /* update userNewInfoDto bằng các giá trị từ formUserNewInfo truyền vào */
    this.userNewInfoDto = this.updateUserNewInfor(this.userNewInfoDto, this.formUserNewInfo);
    /* update ảnh avatar trước, background, xong rồi lưu vào database */
    this.createFileBase();

    this.dataService.changeMessage('Hello from Sibling');

  }

  /*
      Create by: Hieu
      Effective:
        + Up ảnh lên firebase,
        + Up ảnh xong nhận đường link url của avatar, background rồi đẩy xuống backend
  */

  // public result: string = 'bat dau url ';

  createFileBase() {
    this.loading = true;

    if (this.selectedImgAvatar == null || this.selectedImgBackground == null) {
      this.countFill += 1;
      this.userService.openSnackBar("Bạn vẫn chưa chọn ảnh", "NOT");
      this.ngOnInit();
    }
    console.log("avatar file name = " + this.selectedImgAvatar.name);
    const filePathAvatar = `undefined/${this.selectedImgAvatar.name}_${new Date().getTime()}`;
    const fileRefAvatar = this.storage.ref(filePathAvatar);
    this.storage.upload(filePathAvatar, this.selectedImgAvatar).snapshotChanges().pipe(
      finalize(() => {
        fileRefAvatar.getDownloadURL().subscribe(async (avatarData) => {
          // console.log("Dòng đầu tiên trong method createFileBase, up avatar " + this.formUserNewInfo.value.fullName);
          this.userNewInfoDto.avatar = await avatarData;
          console.log('url avatar firebase đã gán cho this.userNewInfoDto = ' + this.userNewInfoDto.avatar);
          console.log('url avatar firebase id = ' + this.userNewInfoDto.id);
        }, error => {
        }, () => {
          console.log("background file name = " + this.selectedImgBackground.name);
          const filePathBackground = `undefined/${this.selectedImgBackground.name}_${new Date().getTime()}`;
          const fileRefBackground = this.storage.ref(filePathBackground);
          this.storage.upload(filePathBackground, this.selectedImgBackground).snapshotChanges().pipe(
            finalize(() => {
              fileRefBackground.getDownloadURL().subscribe(async (backgroundData) => {
                this.userNewInfoDto.background = await backgroundData;
                console.log('url background firebase đã gán cho this.userNewInfoDto = ' + this.userNewInfoDto.background);
              }, error => {
              }, () => {
                this.userService.updateNewInforUser(this.userNewInfoDto.id, this.userNewInfoDto).subscribe(data => {
                    this.userService.openSnackBar("Tạo mới thông tin đã xong", "OK");
                    this.router.navigateByUrl('new-info-detail');
                  },
                  error => {
                    this.loading = false;
                  }, () => {
                    this.loading = false;
                  });
              });
            })
          ).subscribe();

        });
      })
    ).subscribe();

  }

  /*
    Created by: Hieu
    Effective: set các giá trị trong form nhập vào cho userNewInfoDto, rồi đưa xuống backend để lưu
      (lưu ý là function này chưa xét tới trường hợp thay đổi ảnh background và avatar)
  */
  updateUserNewInfor(userNewInfoDto: UserNewInfoDtoRequest, formUserNewInfo: FormGroup): UserNewInfoDtoRequest {
    userNewInfoDto.fullName = formUserNewInfo.value.fullName;
    userNewInfoDto.education = formUserNewInfo.value.education;
    userNewInfoDto.gender = formUserNewInfo.value.gender;
    userNewInfoDto.descriptionUser = formUserNewInfo.value.descriptionUser;
    userNewInfoDto.phone = formUserNewInfo.value.phone;
    userNewInfoDto.job = formUserNewInfo.value.job;
    userNewInfoDto.married = formUserNewInfo.value.married;
    userNewInfoDto.dayOfBirth = formUserNewInfo.value.dayOfBirth;
    userNewInfoDto.datingGender = formUserNewInfo.value.datingGender;
    userNewInfoDto.district = formUserNewInfo.value.district;
    let tempCount = 0;
    for (let hobbyChoose of this.selection) {
      userNewInfoDto.userHobbySet.push(new UserHobby(tempCount, new Hobby(hobbyChoose.id, hobbyChoose.name, hobbyChoose.color)));
      tempCount += 1;
      console.log("Tu form nhap vao = "
        + userNewInfoDto.id + "\n"
        + userNewInfoDto.fullName + "\n"
        + userNewInfoDto.education + "\n"
        + userNewInfoDto.gender + "\n"
        + userNewInfoDto.dayOfBirth + "\n"
        + userNewInfoDto.descriptionUser + "\n"
        + userNewInfoDto.phone + "\n"
        + userNewInfoDto.job + "\n"
        + userNewInfoDto.married + "\n"
        + userNewInfoDto.datingGender + "\n"
        + userNewInfoDto.district.name + "\n"
        + userNewInfoDto.district.province.name + "\n"
      );
    }

//ChienTM---------------------------------------------------------
//ChienTM----------------------------------------------------------
//ChienTM---------------------------------------------------------
    const newUser = {avatar: '', id: '', fullName: '', status: ''};
    newUser.avatar = userNewInfoDto.avatar;
    newUser.id = this.tokenService.getUser().user.id;
    newUser.fullName = userNewInfoDto.fullName;
    newUser.status = "online";
    const createNewUser = firebase.database().ref('users/').push();
    createNewUser.set(newUser);
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
    return userNewInfoDto;
  }


  // Lấy list huyện theo tỉnh
  getDistrict(){
    this.userService
      .getDistrictByProvinceId(this.formUserNewInfo.value.province.id)
      .subscribe((districtListData) => {
        this.districts = districtListData;
      });
  }



  /*
    public districtsFollowProvince: District[];
    public provinceChose: Province;
    public provinceTemp: Province;
    getDistrictFollowProvince() {
      this.provinceTemp = this.formUserNewInfo.value.province;
      console.log("tên tỉnh chọn từ form = " + this.formUserNewInfo.value.province.name);
      this.districts.forEach(districtElement => {
        if (districtElement.province.id == provinceTemp.id) {
          console.log("Tỉnh đã chọn = " + districtElement.province.name + ", huyện tương ứng = " + districtElement.name);
          this.districtsFollowProvince.push(new District(districtElement.id, districtElement.name
            , districtElement.prefix, districtElement.province));
        }
      })
    }
  */

//_-*-__-*-__-*-__-*-__-*-__-*-__-*-__-*-_
  /* Thanh Tuan*/

  logOut(): void {
    this.dataService.changeMessage("");
    this.tokenService.logOut();
    this.router.navigateByUrl('login');
  }


}


