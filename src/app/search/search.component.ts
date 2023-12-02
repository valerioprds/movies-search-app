import { Component } from '@angular/core';
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
    private favoritesService: FavoritesService
  ) {}

  performSearch(query: string) {
    this.moviesService.search(query).subscribe((response) => {
      this.results = response.Search;
      // console.log(this.results);
    });
  }

  addToFavorites(movie: any) {
    this.favoritesService.addFavorite(movie);
  }
}
