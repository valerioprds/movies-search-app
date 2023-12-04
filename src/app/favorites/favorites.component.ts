import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/service/favorites.service';
import { FavoriteMovie } from '../interface/favoriteMovie';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteMovie[] = [];
  filteredFavorites: FavoriteMovie[] = [];
  filterForm!: FormGroup;
  commentForms: FormGroup[] = [];
  isFilterApplied = false;

  constructor(
    private favoritesService: FavoritesService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadFavorites();
    this.initializeForm();
  }

  private loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
    this.filteredFavorites = [...this.favorites];
    this.initializeCommentForms();
  }

  private initializeCommentForms() {
    this.commentForms = this.filteredFavorites.map((favorite) =>
      this.fb.group({
        comment: [
          this.retrieveComment(favorite.imdbID),
          Validators.maxLength(200),
        ],
      })
    );
  }

  private retrieveComment(imdbID: string): string {
    return localStorage.getItem(`comment_${imdbID}`) || '';
  }

  saveComment(index: number) {
    const commentValue = this.commentForms[index].get('comment')?.value;
    localStorage.setItem(
      `comment_${this.filteredFavorites[index].imdbID}`,
      commentValue
    );
    this.filteredFavorites[index].comment = commentValue;
  }

  removeFromFavorites(movie: FavoriteMovie) {
    this.favoritesService.removeFavorite(movie);
    this.toastr.success('Movie deleted from Favorites', 'Success!');
    this.loadFavorites();
  }

  private initializeForm() {
    this.filterForm = this.fb.group({
      yearFilter: [''],
      typeFilter: [''],
      nameFilter: [''],
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  private applyFilters() {
    let filtered = [...this.favorites];

    // Check if any filter is applied
    this.isFilterApplied =
      this.filterForm.value.yearFilter ||
      this.filterForm.value.typeFilter ||
      this.filterForm.value.nameFilter;

    filtered = this.applyYearFilter(filtered);
    filtered = this.applyTypeFilter(filtered);
    filtered = this.applyNameFilter(filtered);
    this.filteredFavorites = this.applySort(filtered);
  }

  private applyYearFilter(favorites: FavoriteMovie[]): FavoriteMovie[] {
    if (this.filterForm.value.yearFilter) {
      return favorites.filter(
        (favorite) => favorite.Year === this.filterForm.value.yearFilter
      );
    }
    return favorites;
  }

  private applyTypeFilter(favorites: FavoriteMovie[]): FavoriteMovie[] {
    if (this.filterForm.value.typeFilter) {
      return favorites.filter(
        (favorite) => favorite.Type === this.filterForm.value.typeFilter
      );
    }
    return favorites;
  }

  private applyNameFilter(favorites: FavoriteMovie[]): FavoriteMovie[] {
    const nameFilter = this.filterForm.value.nameFilter?.toLowerCase();
    if (nameFilter) {
      return favorites.filter((favorite) =>
        favorite.Title.toLowerCase().includes(nameFilter)
      );
    }
    return favorites;
  }

  private applySort(favorites: FavoriteMovie[]): FavoriteMovie[] {
    const sortType = this.filterForm.value.sortType;
    if (sortType === 'title') {
      return favorites.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortType === 'year') {
      return favorites.sort((a, b) => a.Year.localeCompare(b.Year));
    }
    return favorites;
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
