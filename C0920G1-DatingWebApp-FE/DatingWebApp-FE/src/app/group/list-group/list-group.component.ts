import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../service/group.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteGroupComponent} from "../delete-group/delete-group.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from 'rxjs';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {
  message: string;
  subscription: Subscription;
  groups = [];
  size = 5;
  pageClicked = 0;
  totalPages = 1;
  pages = [];
  searchInput: string;
  loading: boolean;
   id  : number ;

  constructor(
    public groupService: GroupService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.onSubmit(0);
    // this.dataService.changeMessage('Hello World')

  }

  onSubmit(page) {
    this.groupService.getAllGroup(page, this.size).subscribe(
      data => {
        console.log(data);
        this.groups = data.content;
        console.log(data.content);
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        console.log(data.totalPages);
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }
    )
  }


  search(page){
    this.groupService.getAllGroupByName(this.searchInput , this.size).subscribe(data => {
      if (data == null) {
        this.snackBar.open('Không có dữ liệu mà bạn tìm kiếm!', 'Đóng', {
          duration: 4000,
        });
        this.onSubmit(0);
      } else {
        this.groups = data.content  ;
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }
    });
  }

  onNext(){
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }


  openDeleteDialog(id: number) {
    this.groupService.getGroupById(id).subscribe(dataOfGroup => {
      const dialogRef = this.dialog.open(DeleteGroupComponent, {
        width: '500px',
        data: {data1: dataOfGroup},

      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }
}
