import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';
import { Artist } from 'src/app/models/Artist';
import { SearchArtist } from 'src/app/models/SearchArtists';

@Component({
  selector: 'app-compareartists',
  templateUrl: './compareartists.component.html',
  styleUrls: ['./compareartists.component.css']
})
export class CompareartistsComponent {

  constructor(public dialogRef: MatDialogRef<CompareartistsComponent>, private apiService: ApiService) { }

  //Variables
  searchStr: string = "";
  searchStr2: string = "";

  visability1: boolean = false;
  visability2: boolean = false;
  options: Array<string> = ["", "", ""];

  //Interfaces
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

  searchArtist: SearchArtist = {
    name1: '',
    name2: '',
    name3: ''
  };


  // if input from search input changes -> show matching artist results as auto-complete function under search input
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

  //get artist 1 infos from api 
  compareArtist1(artist: string) {
    this.apiService.getArtistInfo(artist, 'getinfo').subscribe((res: any) => {
      this.artist1.name = res.artist.name;
      this.artist1.image = res.artist.image[2]['#text'];
      this.artist1.listeners = res.artist.stats.listeners;
      this.artist1.playcount = res.artist.stats.playcount;
      this.artist1.summary = res.artist.bio.summary;
      this.artist1.url = res.artist.url;
    });
    this.visability1 = true;
    this.searchStr = "";
  }

   //get artist 2 infos from api
  compareArtist2(artist: string) {
    this.apiService.getArtistInfo(artist, 'getinfo').subscribe((res: any) => {
      this.artist2.name = res.artist.name;
      this.artist2.image = res.artist.image[2]['#text'];
      this.artist2.listeners = res.artist.stats.listeners;
      this.artist2.playcount = res.artist.stats.playcount;
      this.artist2.summary = res.artist.bio.summary;
      this.artist2.url = res.artist.url;
    });
    this.visability2 = true;
    this.searchStr2 = "";
  }
}