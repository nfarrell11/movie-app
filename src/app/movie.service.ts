import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getDateRangeFromToday } from './utils/date-utils';

const API_KEY = '7770e8ee83dab20ceb92ed381dce0c4e';
const BASE_URL = 'https://api.themoviedb.org/3';  // uses TMDB v.3 API
const DATE_RANGE_LENGTH = 30;

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  genre_ids: number[];
}
export interface Genre {
  id: number;
  name: string;
}
export interface MovieResponse {
  page: number;
  total_pages: number;
  results: Movie[];
}
export interface GenreResponse {
  genres: Genre[];
}

@Injectable({
  providedIn: 'root',
})
/**
 * MovieService is the service layer between our application and the TMDB API.
 */
export class MovieService {
  constructor(private _http: HttpClient) {};

  /**
   * Get all genres in the database
   * @returns a films of a given genre
   */
  getGenres(): Observable<GenreResponse> {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return this._http.get<GenreResponse>(url);
  }

  /**
   * Get all movies added(?) in the past DATE_RANGE_LENGTH days, with optional genre filter argument.
   * @param genreId -- the TMDB genre ID number
   * @param page -- // TODO
   * @returns
   */
  getMovies(genreId: number | null, page: number): Observable<MovieResponse> {
    const { start, end } = getDateRangeFromToday(DATE_RANGE_LENGTH);
    const params = new URLSearchParams({
      api_key: API_KEY,
      'primary_release_date.gte': start,
      'primary_release_date.lte': end,
      page: page.toString(),
    })
    if(genreId && genreId > 0) {
      params.append('with_genres', genreId.toString());
    }
    const url = `${BASE_URL}/discover/movie?${params.toString()}`;
    return this._http.get<MovieResponse>(url);
  }
}
