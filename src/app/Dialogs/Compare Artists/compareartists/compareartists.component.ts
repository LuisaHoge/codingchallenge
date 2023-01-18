import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, Track } from 'src/app/app.component';
import { ApiService } from 'src/app/Services/api.service';


@Component({
  selector: 'app-compareartists',
  templateUrl: './compareartists.component.html',
  styleUrls: ['./compareartists.component.css']
})
export class CompareartistsComponent {

  constructor(
    public dialogRef: MatDialogRef<CompareartistsComponent>,
   // @Inject(MAT_DIALOG_DATA) public data: DialogData,
private apiService: ApiService) {}

  searchStr: string = "";

  searchMusic(artist: string) {
    console.log(artist);
    /*this.apiService.searchMusic(artist, 'getinfo').subscribe((res: any) => {
      this.artist.name = res.artist.name;
      this.artist.image = res.artist.image[2]['#text'];
      this.artist.listeners = res.artist.stats.listeners;
      this.artist.playcount = res.artist.stats.playcount;
      this.artist.summary = res.artist.bio.summary;
      this.artist.url = res.artist.url;
    });*/
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
