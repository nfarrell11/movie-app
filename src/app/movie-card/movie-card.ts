import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../movie.service';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';
@Component({
  selector: 'movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
/**
 * Takes a Movie object based on the TMDB API structure and generates a UI card for gallery view
 */
export class MovieCard {

  @Input() movie!: Movie;

  readonly imageBaseUrl = IMAGE_BASE_URL;

  get posterUrl(): string | null {
    if(!this.movie?.poster_path) {
      console.log('NO POSTER:', this.movie.title, this.movie.poster_path);
      return null;
    }
    const url = `${this.imageBaseUrl}${this.movie.poster_path}`;
    console.log('POSTER URL:', this.movie.title, url);
    return url;
  }
}
