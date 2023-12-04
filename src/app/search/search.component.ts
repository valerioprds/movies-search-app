import { Movie } from '../interface/movie';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FavoritesService } from 'src/service/favorites.service';
import { MoviesService } from 'src/service/movies.service';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  results: Movie[] = [];

  constructor(
    private moviesService: MoviesService,
    private favoritesService: FavoritesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  /**
   * Performs a search using the MoviesService and updates the results.
   * @param query The search query string.
   */
  performSearch(query: string) {
    this.moviesService
      .search(query)
      .pipe(
        catchError((error) => {
          console.error('Error occurred while searching: ', error);
          this.toastr.error('No results found or error occurred!', 'Error');
          return throwError(error); // Rethrow the error
        })
      )
      .subscribe((response) => {
        if (response.Search && response.Search.length > 0) {
          this.results = response.Search;
        } else {
          this.toastr.error('No results found!', 'Error');
          this.results = [];
        }
      });
  }

  /**
   * Adds a movie to favorites using the FavoritesService and shows a success toast.
   * @param movie The movie object to add to favorites.
   */
  addToFavorites(movie: Movie) {
    if (this.favoritesService.isFavorite(movie)) {
      this.toastr.error('This movie is already in your favorites!', 'Oops');
    } else {
      this.favoritesService.addFavorite(movie);
      this.toastr.success('Movie Added to Favorites', 'Success!');
    }
  }

  /**
   * Navigates to the favorites page.
   */
  showFavorites() {
    this.router.navigate(['/favorites']);
  }
}
