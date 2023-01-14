import { Component } from '@angular/core';
import { ApiService} from '../app/Services/api.service';

export interface Artist {
  name: string;
  image: string;
  listeners: number;
  playcount: number;
  summary: string;
  url: string;
}

export interface Track {
  name: string;
  listeners: number;
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
  searchResult: boolean = true;
  
  artistRank: string = "artist rank";

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
  ];

  constructor(private apiService: ApiService) { }

  searchMusic() {
    this.searchResult = true;
    this.apiService.searchMusic(this.searchStr, 'getinfo').subscribe((res: any) => {
      this.artist.name = res.artist.name;
      this.artist.image = res.artist.image[2]['#text'];
      this.artist.listeners = res.artist.stats.listeners;
      this.artist.playcount = res.artist.stats.playcount;
      this.artist.summary = res.artist.bio.summary;
      this.artist.url = res.artist.url;
    });

    this.apiService.searchMusic(this.searchStr, 'gettoptracks').subscribe((res: any) => {
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
  });
}

  reset() {
    this.searchStr = "";
    this.searchResult = false;
  }
}
