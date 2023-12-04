import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: any[] = [];

  constructor() {
    this.loadFavorites();
  }

  /**
   * Adds a movie to the favorites list and saves it.
   * @param movie The movie object to be added.
   */
  addFavorite(movie: any) {
    if (!this.isFavorite(movie)) {
      this.favorites.push(movie);
      this.saveFavorites();
    }
  }

  /**
   * Checks if a movie is already in favorites.
   * @param movie The movie to check.
   * @returns True if the movie is in favorites, false otherwise.
   */
  isFavorite(movie: any): boolean {
    return this.favorites.some((fav) => fav.imdbID === movie.imdbID);
  }

  /**
   * Removes a movie from the favorites list based on its IMDb ID and saves the updated list.
   * @param movie The movie object to be removed.
   */
  removeFavorite(movie: any) {
    this.favorites = this.favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    this.saveFavorites();
  }

  /**
   * Returns the list of favorite movies.
   * @returns An array of favorite movies.
   */
  getFavorites() {
    return this.favorites;
  }

  /**
   * Loads the favorites from local storage into the service's state.
   */
  private loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
  }

  /**
   * Saves the current state of favorites into local storage.
   */
  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
