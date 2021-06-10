import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-pass',
  templateUrl: './confirm-pass.component.html',
  styleUrls: ['./confirm-pass.component.scss']
})
export class ConfirmPassComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmPassComponent>) { }

  ngOnInit(): void {
  }

}
