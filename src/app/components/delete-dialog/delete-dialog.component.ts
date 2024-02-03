import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';


export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {



  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
