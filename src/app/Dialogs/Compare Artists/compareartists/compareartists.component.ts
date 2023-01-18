import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';
import { Artist } from 'src/app/models/Artist';


@Component({
  selector: 'app-compareartists',
  templateUrl: './compareartists.component.html',
  styleUrls: ['./compareartists.component.css']
})
export class CompareartistsComponent {

  constructor(
    public dialogRef: MatDialogRef<CompareartistsComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: ApiService) { }

  searchStr: string = "";
  searchStr2: string = "";

  artist1: Artist = {
    name: '',
    image: '',
    listeners: 0,
    playcount: 0,
    summary: '',
    url: ''
  };

  artist2: Artist = {
    name: '',
    image: '',
    listeners: 0,
    playcount: 0,
    summary: '',
    url: ''
  };

  compareArtist1(artist: string) {
    this.apiService.searchMusic(artist, 'getinfo').subscribe((res: any) => {
      this.artist1.name = res.artist.name;
      this.artist1.image = res.artist.image[2]['#text'];
      this.artist1.listeners = res.artist.stats.listeners;
      this.artist1.playcount = res.artist.stats.playcount;
      this.artist1.summary = res.artist.bio.summary;
      this.artist1.url = res.artist.url;
    });
  }

  compareArtist2(artist: string) {
    this.apiService.searchMusic(artist, 'getinfo').subscribe((res: any) => {
      this.artist2.name = res.artist.name;
      this.artist2.image = res.artist.image[2]['#text'];
      this.artist2.listeners = res.artist.stats.listeners;
      this.artist2.playcount = res.artist.stats.playcount;
      this.artist2.summary = res.artist.bio.summary;
      this.artist2.url = res.artist.url;
    });
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
