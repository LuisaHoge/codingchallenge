import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogData, Track } from 'src/app/app.component';


@Component({
  selector: 'app-artist-search-dialog',
  templateUrl: './artist-search-dialog.component.html',
  styleUrls: ['./artist-search-dialog.component.css']
})
export class ArtistSearchDialogComponent {

  constructor(public dialogRef: MatDialogRef<ArtistSearchDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  get artists() {
    return this.data.artist;
   }

   get albums(){
    return this.data.album;
   }

   arr: Array<any> = [];
   
   butti(){
    this.arr.push(this.data.track1);
    this.arr.push(this.data.track2);
    console.log(this.arr);
   }

  /* get tracks(){
    return this.data.track;
   }*/

  /* get tracks(): Track {
    return this.data.track;
   }*/
}

