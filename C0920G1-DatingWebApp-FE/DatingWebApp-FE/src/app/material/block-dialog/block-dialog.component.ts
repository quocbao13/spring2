import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-block-dialog',
  templateUrl: './block-dialog.component.html',
  styleUrls: ['./block-dialog.component.scss']
})
export class BlockDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: string, private dialogRef: MatDialogRef<BlockDialogComponent>) {
    this.dataTemp = data
  }
  dataTemp: string;
  ngOnInit(): void {
  }

  onConfirmClick(isDelete: boolean) {
    if (isDelete) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }
}
