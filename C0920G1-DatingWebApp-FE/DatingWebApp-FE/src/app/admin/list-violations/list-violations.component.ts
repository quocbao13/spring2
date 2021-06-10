import {Component, Inject, OnInit} from '@angular/core';
import {ViolationDTO} from '../DTO/violation-dto';
import {MemberService} from '../member_service/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberDTO} from '../DTO/member-dto';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GroupService} from '../../service/group.service';
import {MessageComponent} from '../../material/message/message.component';

@Component({
  selector: 'app-list-violations',
  templateUrl: './list-violations.component.html',
  styleUrls: ['./list-violations.component.scss']
})
export class ListViolationsComponent implements OnInit {
  violations: ViolationDTO[];
  userId: number;
  member: MemberDTO;
  checkListViolation = false;
  public loading = false;


  constructor(private memberService: MemberService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.listViolations();
  }

  listViolations() {
    this.activatedRoute.params.subscribe(data => {
      this.userId = Number(data.id);
      this.memberService.getMemberByUserId(this.userId).subscribe(data1 => {
        this.member = data1;
      });

      this.memberService.getViolationsByUserId(this.userId).subscribe(data2 => {
        this.violations = data2;
        if (this.violations == null) {
          this.checkListViolation = false;
        } else {
          this.checkListViolation = true;
        }
      });
    });
  }

  banOneWeek() {
    this.loading=true;
    this.activatedRoute.params.subscribe(data => {
      this.userId = Number(data.id);
      this.memberService.banAccountForOneWeek(this.userId).subscribe(data2 => {
        this.loading = false;
        const dialogRef = this.dialog.open(MessageComponent, {
            width: '500px',
            data: 'Khoá tài khoản thành công',
            disableClose: true
          })
        ;
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigateByUrl('/member');
        });
      }, error => {
        this.loading = false;
      });
    });
  }

  banOneMonth() {
    this.loading=true;
    this.activatedRoute.params.subscribe(data => {
      this.userId = Number(data.id);
      this.memberService.banAccountForOneMonth(this.userId).subscribe(data2 => {
        this.loading = false;
        const dialogRef = this.dialog.open(MessageComponent, {
            width: '500px',
            data: 'Khoá tài khoản thành công',
            disableClose: true
          })
        ;
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigateByUrl('/member');
        });
      }, error => {
        this.loading = false;
      });
    });
  }

  banForever() {
    this.loading=true;
    this.activatedRoute.params.subscribe(data => {
      this.userId = Number(data.id);
      this.memberService.banAccountForever(this.userId).subscribe(data2 => {
        this.loading = false;
        const dialogRef = this.dialog.open(MessageComponent, {
            width: '500px',
            data: 'Khoá tài khoản thành công',
            disableClose: true
          })
        ;
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigateByUrl('/member');
        });
      }, error => {
        this.loading = false;
      });
    });
  }

  warning() {
    this.loading=true;
    this.activatedRoute.params.subscribe(data => {
      this.userId = Number(data.id);
      this.memberService.warningAccount(this.userId).subscribe(data2 => {
        this.loading = false;
        const dialogRef = this.dialog.open(MessageComponent, {
            width: '500px',
            data: 'Đả gửi email cảnh báo thành công',
            disableClose: true
          })
        ;
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigateByUrl('/member');
        });
      }, error => {
        this.loading = false;
      });
    });
  }
}
