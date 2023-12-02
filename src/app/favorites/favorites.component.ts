import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FavoritesService } from 'src/service/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  filteredFavorites: any[] = [];
  filterForm!: FormGroup;

  constructor(private favoritesService: FavoritesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadFavorites();
    this.initializeForm();
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
    this.filteredFavorites = [...this.favorites];
  }

  removeFromFavorites(movie: any) {
    this.favoritesService.removeFavorite(movie);
    this.loadFavorites(); // Reload the favorites list after deletion
    console.log('deleted one movie', this.favorites);
  }

  initializeForm() {
    this.filterForm = this.fb.group({
      sortType: [''],
      yearFilter: [''],
      typeFilter: ['']
    });

    this.filterForm.valueChanges.subscribe(val => {
      this.applyFilters();
    });
  }

  applyFilters() {
    let filtered = [...this.favorites];

    if (this.filterForm.value.yearFilter) {
      filtered = filtered.filter(favorite => favorite.Year === this.filterForm.value.yearFilter);
    }

    if (this.filterForm.value.typeFilter) {
      filtered = filtered.filter(favorite => favorite.Type === this.filterForm.value.typeFilter);
    }

    if (this.filterForm.value.sortType === 'title') {
      filtered.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (this.filterForm.value.sortType === 'year') {
      filtered.sort((a, b) => a.Year.localeCompare(b.Year));
    }

    this.filteredFavorites = filtered;
  }
}
