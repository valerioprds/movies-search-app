import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/service/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFromFavorites(movie: any) {
    this.favoritesService.removeFavorite(movie);
    this.loadFavorites(); // Recargar la lista de favoritos después de eliminar
    console.log('deleted one movie' , this.favorites)
  }
}
