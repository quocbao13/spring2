import {Component, OnInit} from '@angular/core';
import {MemberDTO} from '../DTO/member-dto';
import {MemberService} from '../member_service/member.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss']
})
export class ListMemberComponent implements OnInit {
  listMemberDTO: MemberDTO[];
  check1 = true;
  size = 5;
  userNameSearch = '';
  notificationSearch='Dữ liệu cần tìm không tồn tại';
  checkSearch=false;


  constructor(private memberService: MemberService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.listMember();
  }

  listMember() {
    this.memberService.listMember(this.size).subscribe(data => {
      console.log(data);
      this.listMemberDTO = data;
      this.checkSearch=false;
    });
  }

  loadMore() {
    this.size += 3;
    console.log(this.userNameSearch);
    if (this.userNameSearch == ""){
      this.listMember();
    }else {

      this.search();
    }
  }

  search() {
    this.memberService.listMemberByName(this.userNameSearch.trim(), this.size).subscribe(data => {
      this.listMemberDTO = data;
      console.log(data);
      this.check1 = true;
      if(data == null){
        this.check1 = false;
        this.size = 5;
        this.checkSearch=true;
      }else if(this.listMemberDTO.length - this.size != 0){
        this.check1 = false;
        this.size = 5;
        this.checkSearch=false;
      }
    });
  }
}
