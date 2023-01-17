import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, Track } from 'src/app/app.component';


@Component({
  selector: 'app-compareartists',
  templateUrl: './compareartists.component.html',
  styleUrls: ['./compareartists.component.css']
})
export class CompareartistsComponent {

  constructor(
    public dialogRef: MatDialogRef<CompareartistsComponent>,
   // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
