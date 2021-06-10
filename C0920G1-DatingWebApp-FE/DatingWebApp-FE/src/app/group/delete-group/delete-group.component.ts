import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GroupService} from "../../service/group.service";

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss']
})
export class DeleteGroupComponent implements OnInit {
  groupName = '';
  groupId = '';
  constructor(
    public dialogRef: MatDialogRef<DeleteGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public groupService: GroupService,
    ) { }

  ngOnInit(): void {
    this.groupName =this.data.data1.name;
    this.groupId = this.data.data1.id;
  }


  deleteGroup(){
    this.groupService.deleteGroup(this.groupId).subscribe(data => {
      this.dialogRef.close();
    });
  }

}
