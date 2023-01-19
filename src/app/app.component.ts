import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../app/Services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ArtistSearchDialogComponent } from './Dialogs/artist-search-dialog/artist-search-dialog.component';
import { CompareartistsComponent } from './Dialogs/Compare Artists/compareartists/compareartists.component';
import { Artist } from './models/Artist';
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

  //Variables
  title = 'LastFM API Coding Challenge';
  searchStr: string = "";
  options: Array<string> = ["", "", ""];

  //Interfaces
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


  //Check which tab/country was clicked -> search Top Artists in Country
  myTabSelectedIndexChange(index: number) {
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

  ngOnInit() {
    this.myTabSelectedIndexChange(0);
  }

  //if input from search input changes -> show matching artist results as auto-complete function under search input in navbar
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

  //show ArtistSearchDialog with artist/track/album info
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

  //show CompareArtistDialog
  openCompareArtistDialog(): void {
    const dialogRef = this.CAdialog.open(CompareartistsComponent, {
      data: {}
    });
  }

  //get artist/tracks/albums informations from api for dialogs pages
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
      for (let i = 0; i < 5; i++) {
        this.tracks[i].name = res.toptracks.track[i].name;
        this.tracks[i].url = res.toptracks.track[i].url;
        this.tracks[i].playcount = res.toptracks.track[i].playcount;
        this.tracks[i].image = res.toptracks.track[i].image[2]['#text'];
      }
    });

    this.apiService.getArtistInfo(artist, 'gettopalbums').subscribe((res: any) => {
      for (let i = 0; i < 5; i++) {
        this.albums[i].name = res.topalbums.album[i].name;
        this.albums[i].url = res.topalbums.album[i].url;
        this.albums[i].playcount = res.topalbums.album[i].playcount;
        this.albums[i].image = res.topalbums.album[i].image[2]['#text'];
      }
    });
    this.openDialog();
    this.searchStr = "";
  }

  //get top artist informations from api for main page
  searchTopArtists(countryname: string) {
    this.apiService.searchTopArtistsInCountry(countryname).subscribe((res: any) => {
      for (let i = 0; i < 10; i++) {
        this.topArtists[i].name = res.topartists.artist[i].name;
        this.topArtists[i].playcount = res.topartists.artist[i].listeners;
      }
    });
  }
}
