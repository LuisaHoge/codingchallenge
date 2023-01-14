import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY_LASTFM = "153a8898638819136faae22866352f7c";

  constructor(private http: HttpClient) { }

  searchMusic(artistName: string, queryType: string) {
    return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=artist.${queryType}&artist=${artistName}&api_key=${this.API_KEY_LASTFM}&format=json`);
  }

  searchTopArtistsInCountry(countryname: string) {
    return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${countryname}&api_key=${this.API_KEY_LASTFM}&format=json`);
  }
}


