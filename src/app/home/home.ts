import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Genre, Movie, MovieService } from '../movie.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  movies: Movie[] = [];
  genres: Genre[] = [];

  selectedGenreId: number | null = null;

  currentPage = 1;
  totalPages = 1;

  constructor(private movieService: MovieService) {};

  ngOnInit() : void {
    this.loadGenres();
    this.loadMovies(this.selectedGenreId, this.currentPage);
  }

  private loadGenres(): void {
    this.movieService.getGenres().subscribe({
      next: (data) => {
        this.genres = data.genres;
        console.log('Genres:', this.genres )
      },
      error: (err) => {
        console.error('Error loading genres', err);
      }
    })
  }

  private loadMovies(genreId: number | null, page: number): void {
    this.movieService.getMovies(genreId, page).subscribe({
      next: (data) => {
        this.movies = data.results;
        this.currentPage = data.page;
        this.totalPages = data.total_pages;
        console.log('Movies: ', this.movies);
      },
      error: (err) => {
        console.error('Error loading movies', err)
      },
    });
  }

  onGenreChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.selectedGenreId = value ? Number(value) : null;
    this.currentPage = 1;

    this.loadMovies(this.selectedGenreId, this.currentPage);
  }
}
