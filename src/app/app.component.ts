import { Component, ViewChild } from '@angular/core';
import { ApiService} from '../app/Services/api.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ArtistSearchDialogComponent } from './Dialogs/artist-search-dialog/artist-search-dialog.component';

export interface Artist {
  name: string;
  image: string;
  listeners: number;
  playcount: number;
  summary: string;
  url: string;
}

export interface DialogData {
  artist: Artist;
  track: Track;
  album: Album;
}

export interface Track {
  name: string;
  listeners: number;
  rank: number;
  url: string;
}

export interface Album {
  name: string;
  playcount: number;
  rank: number;
  url: string;
}

export interface TopArtistsInCountry{
  rank: number;
  name: string;
  playcount: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {


  title = 'lastFmApp';

  searchStr: string = "";

 
  myTabSelectedIndexChange(index: number) {
    console.log('Selected index: ' + index);
    if(index == 0){
      this.searchTopArtists("New Zealand");
    }
    else if(index == 1){
      this.searchTopArtists("Japan");
    }
    else{
      this.searchTopArtists("Canada");
    }
 } 


 /*ngOnInit(){
  this.myTabSelectedIndexChange(0);
 }*/
 


  artist: Artist = {
    name: '',
    image: '',
    listeners: 0,
    playcount: 0,
    summary: '',
    url: ''
  };

  tracks: Track[] = [
    { name: '', url: '', rank: 1, listeners: 0 },
    { name: '', url: '', rank: 2, listeners: 0 },
    { name: '', url: '', rank: 3, listeners: 0 },
    { name: '', url: '', rank: 4, listeners: 0 },
    { name: '', url: '', rank: 5, listeners: 0 },
  ];

  topArtists: TopArtistsInCountry[] = [
    { rank: 1, name: '', playcount: 0},
    { rank: 2, name: '', playcount: 0},
    { rank: 3, name: '', playcount: 0},
    { rank: 4, name: '', playcount: 0},
    { rank: 5, name: '', playcount: 0},
    { rank: 6, name: '', playcount: 0},
    { rank: 7, name: '', playcount: 0},
    { rank: 8, name: '', playcount: 0},
    { rank: 9, name: '', playcount: 0},
    { rank: 10, name: '', playcount: 0},
  ];

  albums: Album[] = [
    { name: '', url: '', rank: 1, playcount: 0 },
    { name: '', url: '', rank: 2, playcount: 0 },
    { name: '', url: '', rank: 3, playcount: 0 },
    { name: '', url: '', rank: 4, playcount: 0 },
    { name: '', url: '', rank: 5, playcount: 0 },
  ];

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ArtistSearchDialogComponent, {
    data: {artist: this.artist, track: this.tracks, album: this.albums}});
  }

  searchMusic(artist: string) {
    this.apiService.searchMusic(artist, 'getinfo').subscribe((res: any) => {
      this.artist.name = res.artist.name;
      this.artist.image = res.artist.image[2]['#text'];
      this.artist.listeners = res.artist.stats.listeners;
      this.artist.playcount = res.artist.stats.playcount;
      this.artist.summary = res.artist.bio.summary;
      this.artist.url = res.artist.url;
    });

    this.apiService.searchMusic(artist, 'gettoptracks').subscribe((res: any) => {
        this.tracks[0].name = res.toptracks.track[0].name;
        this.tracks[0].url = res.toptracks.track[0].url;
        this.tracks[0].listeners = res.toptracks.track[0].listeners;
        this.tracks[1].name = res.toptracks.track[1].name;
        this.tracks[1].url = res.toptracks.track[1].url;
        this.tracks[1].listeners = res.toptracks.track[1].listeners;
        this.tracks[2].name = res.toptracks.track[2].name;
        this.tracks[2].url = res.toptracks.track[2].url;
        this.tracks[2].listeners = res.toptracks.track[2].listeners;
        this.tracks[3].name = res.toptracks.track[3].name;
        this.tracks[3].url = res.toptracks.track[3].url;
        this.tracks[3].listeners = res.toptracks.track[3].listeners;
        this.tracks[4].name = res.toptracks.track[4].name;
        this.tracks[4].url = res.toptracks.track[4].url;
        this.tracks[4].listeners = res.toptracks.track[4].listeners;
    });

    this.apiService.searchMusic(artist, 'gettopalbums').subscribe((res: any) => {
      this.albums[0].name = res.topalbums.album[0].name;
      this.albums[0].url = res.topalbums.album[0].url;
      this.albums[0].playcount = res.topalbums.album[0].playcount;
      this.albums[1].name = res.topalbums.album[1].name;
      this.albums[1].url = res.topalbums.album[1].url;
      this.albums[1].playcount = res.topalbums.album[1].playcount;
      this.albums[2].name = res.topalbums.album[2].name;
      this.albums[2].url = res.topalbums.album[2].url;
      this.albums[2].playcount = res.topalbums.album[2].playcount;
      this.albums[3].name = res.topalbums.album[3].name;
      this.albums[3].url = res.topalbums.album[3].url;
      this.albums[3].playcount = res.topalbums.album[3].playcount;
      this.albums[4].name = res.topalbums.album[4].name;
      this.albums[4].url = res.topalbums.album[4].url;
      this.albums[4].playcount = res.topalbums.album[4].playcount;
    });
    this.openDialog();
  }

 

searchTopArtists(countryname: string){
  this.apiService.searchTopArtistsInCountry(countryname).subscribe((res: any) => {
    this.topArtists[0].name = res.topartists.artist[0].name;
    this.topArtists[0].playcount = res.topartists.artist[0].listeners;

    this.topArtists[1].name = res.topartists.artist[1].name;
    this.topArtists[1].playcount = res.topartists.artist[1].listeners;

    this.topArtists[2].name = res.topartists.artist[2].name;
    this.topArtists[2].playcount = res.topartists.artist[2].listeners;

    this.topArtists[3].name = res.topartists.artist[3].name;
    this.topArtists[3].playcount = res.topartists.artist[3].listeners;

    this.topArtists[4].name = res.topartists.artist[4].name;
    this.topArtists[4].playcount = res.topartists.artist[4].listeners;

    this.topArtists[5].name = res.topartists.artist[5].name;
    this.topArtists[5].playcount = res.topartists.artist[5].listeners;

    this.topArtists[6].name = res.topartists.artist[6].name;
    this.topArtists[6].playcount = res.topartists.artist[6].listeners;

    this.topArtists[7].name = res.topartists.artist[7].name;
    this.topArtists[7].playcount = res.topartists.artist[7].listeners;

    this.topArtists[8].name = res.topartists.artist[8].name;
    this.topArtists[8].playcount = res.topartists.artist[8].listeners;

    this.topArtists[9].name = res.topartists.artist[9].name;
    this.topArtists[9].playcount = res.topartists.artist[9].listeners;
  });
}

  reset() {
   // this.searchStr = "";
  }
}
