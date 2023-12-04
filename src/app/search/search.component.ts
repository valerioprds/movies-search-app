import { Component } from '@angular/core';
import { FavoritesService } from 'src/service/favorites.service';
import { MoviesService } from 'src/service/movies.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  performSearch(query: string) {
    this.moviesService.search(query).subscribe((response) => {
      this.results = response.Search;
      // console.log(this.results);
    });
  }

  addToFavorites(movie: any) {
    this.favoritesService.addFavorite(movie);
    this.toastr.success('Movie Added to Favorites', 'Success!');
  }

  showFavorites() {
    this.router.navigate(['/favorites']);
  }
}
