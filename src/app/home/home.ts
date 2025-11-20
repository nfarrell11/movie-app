import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Genre, Movie, MovieService } from '../movie.service';
import { MovieCard } from '../movie-card/movie-card';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCard],
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
  // gains a list of all valid genres in the database
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
  // uses movie service to request a page of results from the API. Can filter by genre or return all results.
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
  // listens for changes to the dropdown select input and loads a new array of movies to display based on the selection
  onGenreChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.selectedGenreId = value ? Number(value) : null;
    this.currentPage = 1;

    this.loadMovies(this.selectedGenreId, this.currentPage);
  }
  // returns true unless user is on the first page
  get canGoPrev(): boolean {
    return this.currentPage > 1;
  }
  // returns true unless the user is on the last page
  get canGoNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  // decrements the page (-1) and loads a new array of movies to display
  prevPage(): void {
    if(!this.canGoPrev) {
      return;
    }
    const newPage = this.currentPage - 1;
    this.loadMovies(this.selectedGenreId, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // increments the page (+1) and loads a new array of movies to display
  nextPage(): void {
    if(!this.canGoNext) {
      return;
    }
    const newPage = this.currentPage + 1;
    this.loadMovies(this.selectedGenreId, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
