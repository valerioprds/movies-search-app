import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: any[] = [];

  constructor() {
    this.loadFavorites();
  }

  addFavorite(movie: any) {
    this.favorites.push(movie);
    this.saveFavorites();
    console.log(this.favorites, 'desde el servicio')
  }

  removeFavorite(movie: any) {
    this.favorites = this.favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    this.saveFavorites();
  }

  getFavorites() {
    return this.favorites;
  }

  private loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
  }

  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
