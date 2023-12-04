import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FavoritesService } from 'src/service/favorites.service';
import { MoviesService } from 'src/service/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  results: any[] = [];

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
    this.moviesService.search(query).subscribe((response) => {
      this.results = response.Search;
    });
  }

  /**
   * Adds a movie to favorites using the FavoritesService and shows a success toast.
   * @param movie The movie object to add to favorites.
   */
  addToFavorites(movie: any) {
    this.favoritesService.addFavorite(movie);
    this.toastr.success('Movie Added to Favorites', 'Success!');
  }

  /**
   * Navigates to the favorites page.
   */
  showFavorites() {
    this.router.navigate(['/favorites']);
  }
}
