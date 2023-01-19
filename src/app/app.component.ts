import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../app/Services/api.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArtistSearchDialogComponent } from './Dialogs/artist-search-dialog/artist-search-dialog.component';
import { CompareartistsComponent } from './Dialogs/Compare Artists/compareartists/compareartists.component';
import { Artist } from './models/Artist';
import { DialogData } from './models/DialogData';
import { Track } from './models/Track';
import { Album } from './models/Album';
import { TopArtistsInCountry } from './models/TopArtistsInCountry';
import { SearchArtist } from './models/SearchArtists';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private apiService: ApiService, private dialog: MatDialog, private CAdialog: MatDialog) { }

  title = 'Lastfm Coding Challenge';
  searchStr: string = "";
  options: Array<string> = ["", "", ""];

  myTabSelectedIndexChange(index: number) {
    console.log('Selected index: ' + index);
    if (index == 0) {
      this.searchTopArtists("New Zealand");
    }
    else if (index == 1) {
      this.searchTopArtists("Japan");
    }
    else {
      this.searchTopArtists("Canada");
    }
  }

  onSearchChange(searchValue: string): void {
    if (searchValue != "") {
      this.options = [];

      this.apiService.artistSearch(searchValue).subscribe((res: any) => {
        this.searchArtist.name1 = res.results.artistmatches.artist[0].name;
        this.searchArtist.name2 = res.results.artistmatches.artist[1].name;
        this.searchArtist.name3 = res.results.artistmatches.artist[2].name;
      });
      this.options.push(this.searchArtist.name1, this.searchArtist.name2, this.searchArtist.name3);
    }
    else {
      this.options = [];
    }
  }



  /*ngOnInit(){
   this.myTabSelectedIndexChange(0);
  }*/

  searchArtist: SearchArtist = {
    name1: '',
    name2: '',
    name3: ''
  };

  artist: Artist = {
    name: '',
    image: '',
    listeners: 0,
    playcount: 0,
    summary: '',
    url: ''
  };

  tracks: Track[] = [
    { name: '', image: '', url: '', rank: 1, playcount: 0 },
    { name: '', image: '', url: '', rank: 2, playcount: 0 },
    { name: '', image: '', url: '', rank: 3, playcount: 0 },
    { name: '', image: '', url: '', rank: 4, playcount: 0 },
    { name: '', image: '', url: '', rank: 5, playcount: 0 },
  ];

  topArtists: TopArtistsInCountry[] = [
    { rank: 1, name: '', playcount: 0 },
    { rank: 2, name: '', playcount: 0 },
    { rank: 3, name: '', playcount: 0 },
    { rank: 4, name: '', playcount: 0 },
    { rank: 5, name: '', playcount: 0 },
    { rank: 6, name: '', playcount: 0 },
    { rank: 7, name: '', playcount: 0 },
    { rank: 8, name: '', playcount: 0 },
    { rank: 9, name: '', playcount: 0 },
    { rank: 10, name: '', playcount: 0 },
  ];

  albums: Album[] = [
    { name: '', image: '', url: '', rank: 1, playcount: 0 },
    { name: '', image: '', url: '', rank: 2, playcount: 0 },
    { name: '', image: '', url: '', rank: 3, playcount: 0 },
    { name: '', image: '', url: '', rank: 4, playcount: 0 },
    { name: '', image: '', url: '', rank: 5, playcount: 0 },
  ];

  openDialog(): void {
    const dialogRef = this.dialog.open(ArtistSearchDialogComponent, {
      data: {
        artist: this.artist,
        track0: this.tracks[0],
        track1: this.tracks[1],
        track2: this.tracks[2],
        track3: this.tracks[3],
        track4: this.tracks[4],
        album0: this.albums[0],
        album1: this.albums[1],
        album2: this.albums[2],
        album3: this.albums[3],
        album4: this.albums[4]
      }
    });
  }

  openCompareArtistDialog(): void {
    const dialogRef = this.CAdialog.open(CompareartistsComponent, {
      data: {}
    });
  }

  searchMusic(artist: string) {
    this.apiService.getArtistInfo(artist, 'getinfo').subscribe((res: any) => {
      this.artist.name = res.artist.name;
      this.artist.image = res.artist.image[2]['#text'];
      this.artist.listeners = res.artist.stats.listeners;
      this.artist.playcount = res.artist.stats.playcount;
      this.artist.summary = res.artist.bio.summary;
      this.artist.url = res.artist.url;
    });


    this.apiService.getArtistInfo(artist, 'gettoptracks').subscribe((res: any) => {
      this.tracks[0].name = res.toptracks.track[0].name;
      this.tracks[0].url = res.toptracks.track[0].url;
      this.tracks[0].playcount = res.toptracks.track[0].playcount;
      this.tracks[0].image = res.toptracks.track[0].image[2]['#text'];

      this.tracks[1].name = res.toptracks.track[1].name;
      this.tracks[1].url = res.toptracks.track[1].url;
      this.tracks[1].playcount = res.toptracks.track[1].playcount;
      this.tracks[1].image = res.toptracks.track[1].image[2]['#text'];

      this.tracks[2].name = res.toptracks.track[2].name;
      this.tracks[2].url = res.toptracks.track[2].url;
      this.tracks[2].playcount = res.toptracks.track[2].playcount;
      this.tracks[2].image = res.toptracks.track[2].image[2]['#text'];

      this.tracks[3].name = res.toptracks.track[3].name;
      this.tracks[3].url = res.toptracks.track[3].url;
      this.tracks[3].playcount = res.toptracks.track[3].playcount;
      this.tracks[3].image = res.toptracks.track[3].image[2]['#text'];

      this.tracks[4].name = res.toptracks.track[4].name;
      this.tracks[4].url = res.toptracks.track[4].url;
      this.tracks[4].playcount = res.toptracks.track[4].playcount;
      this.tracks[4].image = res.toptracks.track[4].image[2]['#text'];
    });

    this.apiService.getArtistInfo(artist, 'gettopalbums').subscribe((res: any) => {
      this.albums[0].name = res.topalbums.album[0].name;
      this.albums[0].url = res.topalbums.album[0].url;
      this.albums[0].playcount = res.topalbums.album[0].playcount;
      this.albums[0].image = res.topalbums.album[0].image[2]['#text'];

      this.albums[1].name = res.topalbums.album[1].name;
      this.albums[1].url = res.topalbums.album[1].url;
      this.albums[1].playcount = res.topalbums.album[1].playcount;
      this.albums[1].image = res.topalbums.album[1].image[2]['#text'];

      this.albums[2].name = res.topalbums.album[2].name;
      this.albums[2].url = res.topalbums.album[2].url;
      this.albums[2].playcount = res.topalbums.album[2].playcount;
      this.albums[2].image = res.topalbums.album[2].image[2]['#text'];

      this.albums[3].name = res.topalbums.album[3].name;
      this.albums[3].url = res.topalbums.album[3].url;
      this.albums[3].playcount = res.topalbums.album[3].playcount;
      this.albums[3].image = res.topalbums.album[3].image[2]['#text'];

      this.albums[4].name = res.topalbums.album[4].name;
      this.albums[4].url = res.topalbums.album[4].url;
      this.albums[4].playcount = res.topalbums.album[4].playcount;
      this.albums[4].image = res.topalbums.album[4].image[2]['#text'];
    });
    this.openDialog();
    this.searchStr = "";
  }

  searchTopArtists(countryname: string) {
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

  compareArtists() {
    this.openDialog();
  }
}
