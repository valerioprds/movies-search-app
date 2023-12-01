import { Component } from '@angular/core';
import { MoviesService } from 'src/service/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  results: any[] = [];

  constructor(private moviesService: MoviesService) {}

  performSearch(query: string) {
    this.moviesService.search(query).subscribe((response) => {
      this.results = response.Search; // Asumiendo que la respuesta tiene una propiedad 'Search'
      console.log(response);
    });
  }
}
