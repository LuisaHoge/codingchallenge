import { Album } from "./Album";
import { Artist } from "./Artist";
import { Track } from "./Track";

export interface DialogData {
    artist: Artist;
    track0: Track;
    track1: Track;
    track2: Track;
    track3: Track;
    track4: Track;
    album0: Album;
    album1: Album;
    album2: Album;
    album3: Album;
    album4: Album;
}