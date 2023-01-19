import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/DialogData';

@Component({
  selector: 'app-artist-search-dialog',
  templateUrl: './artist-search-dialog.component.html',
  styleUrls: ['./artist-search-dialog.component.css']
})
export class ArtistSearchDialogComponent {

  constructor(public dialogRef: MatDialogRef<ArtistSearchDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  //Variables
  tracksDialog: Array<any> = [];
  albumsDialog: Array<any> = [];

  //get artist data -> artist.name for html instead of data.artist.name
  get artists() {
    return this.data.artist;
  }

  //push separte data into arrays to loop through in html
  ngOnInit() {
    this.tracksDialog.push(this.data.track0, this.data.track1, this.data.track2, this.data.track3, this.data.track4);
    this.albumsDialog.push(this.data.album0, this.data.album1, this.data.album2, this.data.album3, this.data.album4);
  }
}