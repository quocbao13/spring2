import {Component, Injectable, OnInit} from '@angular/core';
import {SearchService} from "../service/search.service";
import {SearchUserDTO} from "./searchUserDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {Hobby} from "../model/user/Hobby";
import {Province} from "../model/user/Province";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../service/data.service";
import {TokenService} from "../security/login-service/token.service";


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keyword: string;
  pageUser = 5;
  pageGroup = 5;
  pageAll = 5;
  public listUser: SearchUserDTO[] = [];
  public listGroup: SearchUserDTO[] = [];
  public listGroupUser: SearchUserDTO[] = [];
  public listHobby: Hobby[] = [];
  public listAddress: Province[] = [];
  fromSearchAdvanced: FormGroup;
  message: string;
  startYear: number;
  endYear: number;
  check1 = true;
  check2 = true;
  check3 = true;
  idS: any;

  constructor(private searchService: SearchService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private tokenStorage: TokenService,
              private router: Router) {
  }



  // ngOnInit(key?:string): void {
  //   if(key==null) {
  //     console.log("1")
  //     this.keyword = this.activatedRoute.snapshot.queryParamMap.get('name');
  //   } else {
  //     this.keyword = key;
  //   }
  //   this.dataService.changeMessage('Hello World')
  //   this.fromSearchAdvanced = this.formBuilder.group({
  //     name: [''],
  //     gender: [''],
  //     job: [''],
  //     address: [''],
  //     startAge: [''],
  //     endAge: [''],
  //     hobby: ['']
  //   });
  //   this.keyword = this.activatedRoute.snapshot.queryParamMap.get('name');
  //   this.getAllUserAndGroupByName();
  //   this.getAllUserByName();
  //   this.getAllGroupByName();
  // }





  ngOnInit(key?:string): void {
    this.idS = this.tokenStorage.getUser().id;
    if(key != null) {
      this.keyword = key;
    } else {
      this.keyword = this.activatedRoute.snapshot.queryParamMap.get('name');
    }
    this.getAllUserAndGroupByName();
    this.getAllGroupByName();
    this.getAllUserByName();
    this.fromSearchAdvanced = this.formBuilder.group({
      name: [''],
      gender: [''],
      job: [''],
      address: [''],
      startAge: [''],
      endAge: [''],
      hobby: ['']
    });
  }



  // ngOnInit(key?: string): void {
  //   this.dataService.changeMessage('Hello World');
  //   if(key==null) {
  //     this.keyword = this.activatedRoute.snapshot.queryParamMap.get('name');
  //   } else {
  //     this.keyword = key;
  //   }
  //   this.getAllUserAndGroupByName();
  //   this.getAllGroupByName();
  //   this.getAllUserByName();
  //
  //   this.fromSearchAdvanced = this.formBuilder.group({
  //     name: [''],
  //     gender: [''],
  //     job: [''],
  //     address: [''],
  //     startAge: [''],
  //     endAge: [''],
  //     hobby: ['']
  //   });
  //
  // }

  getAllUserByName() {
    this.searchService.getAllUserByName(this.keyword, this.pageUser).subscribe(data => {
      this.listUser = data;
      this.check2 = true;
      if (data == null) {
        this.check2 = false;
        this.pageUser = 5;
      } else if (this.pageUser - this.listUser.length != 0) {
        this.check2 = false;
        this.pageUser = 5;
      }
    })
  }

  getAllUserAndGroupByName() {
    this.check1 = true;
    this.searchService.getAllUserAndGroupByName(this.keyword, this.pageAll).subscribe(data => {
      this.listGroupUser = data;
      console.log(this.listGroupUser);
      if (data == null) {
        this.check1 = false;
        this.pageAll = 5;
      } else if (this.pageAll - this.listGroupUser.length != 0) {
        this.check1 = false;
        this.pageAll = 5;
      }
    });

  }

  getAllGroupByName() {
    this.check3 = true;
    this.searchService.getAllGroupByName(this.keyword, this.pageGroup).subscribe(data => {
      this.listGroup = data;
      if (data == null) {
        this.check3 = false;
        this.pageGroup = 5;
      } else if (this.pageGroup - this.listGroup.length != 0) {
        this.check3 = false;
        this.pageGroup = 5;
      }
    })
  }

  decrementPageGroup() {
    this.pageGroup += 5;
    this.getAllGroupByName();
  }

  decrementPageAll() {
    this.pageAll += 5;
    this.getAllUserAndGroupByName();
  }

  decrementPageUser() {
    this.pageUser += 5;
    this.searchAdvanced();
  }

  searchAdvanced() {
    this.check2 = true;
    this.startYear = this.fromSearchAdvanced.controls.startAge.value;
    this.endYear = this.fromSearchAdvanced.controls.endAge.value;
    if (this.endYear < this.startYear && this.endYear != 0) {
      this.message = "Năm sinh phải lớn hơn";
      this.listUser = null;
      this.pageUser = 5;
    } else {
      this.message = null;
      console.log(this.fromSearchAdvanced.value);
      this.searchService.searchAdvance(this.fromSearchAdvanced.value, this.pageUser).subscribe(data => {
        if (data == null) {
          this.listUser = null;
          this.check2 = false;
          this.pageUser = 5;
        } else if (data == "") {
          this.listUser = null;
          this.check2 = false;
          this.pageUser = 5;
        } else {
          this.listUser = data;
          const size = this.listUser.length;
          if (this.pageUser - size != 0) {
            this.check2 = false;
          }
        }
      });
    }
  }

  showUpForm() {
    this.fromSearchAdvanced.controls.name.setValue(this.keyword);
    this.searchService.getAllHobby().subscribe(data => {
      this.listHobby = data;
    });
    this.searchService.getAllProvince().subscribe(data => {
      this.listAddress = data;
    })
  }
}
