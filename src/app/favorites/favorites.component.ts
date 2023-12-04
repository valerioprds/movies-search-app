import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/service/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  filteredFavorites: any[] = [];
  filterForm!: FormGroup;
  commentForms: FormGroup[] = [];

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

  /**
   * Loads favorites from the service and initializes comment forms.
   */
  private loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
    this.filteredFavorites = [...this.favorites];
    this.initializeCommentForms();
  }

  /**
   * Initializes comment forms for each favorite.
   */
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

  /**
   * Retrieves a comment from localStorage.
   * @param imdbID The IMDb ID of the movie.
   * @returns The retrieved comment or an empty string.
   */
  private retrieveComment(imdbID: string): string {
    return localStorage.getItem(`comment_${imdbID}`) || '';
  }

  /**
   * Saves the comment for a specific favorite.
   * @param index The index of the favorite in the array.
   */
  saveComment(index: number) {
    const commentValue = this.commentForms[index].get('comment')?.value;
    localStorage.setItem(
      `comment_${this.filteredFavorites[index].imdbID}`,
      commentValue
    );
    this.filteredFavorites[index].comment = commentValue;
  }

  /**
   * Removes a movie from favorites.
   * @param movie The movie to remove.
   */
  removeFromFavorites(movie: any) {
    this.favoritesService.removeFavorite(movie);
    this.toastr.success('Movie deleted from Favorites', 'Success!');
    this.loadFavorites();
  }

  /**
   * Initializes the filter form and subscribes to its changes.
   */
  private initializeForm() {
    this.filterForm = this.fb.group({
      sortType: [''],
      yearFilter: [''],
      typeFilter: [''],
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  /**
   * Applies filters based on the form's current values.
   */
  private applyFilters() {
    let filtered = [...this.favorites];
    filtered = this.applyYearFilter(filtered);
    filtered = this.applyTypeFilter(filtered);
    this.filteredFavorites = this.applySort(filtered);
  }

  private applyYearFilter(favorites: any[]): any[] {
    if (this.filterForm.value.yearFilter) {
      return favorites.filter(
        (favorite) => favorite.Year === this.filterForm.value.yearFilter
      );
    }
    return favorites;
  }

  private applyTypeFilter(favorites: any[]): any[] {
    if (this.filterForm.value.typeFilter) {
      return favorites.filter(
        (favorite) => favorite.Type === this.filterForm.value.typeFilter
      );
    }
    return favorites;
  }

  private applySort(favorites: any[]): any[] {
    const sortType = this.filterForm.value.sortType;
    if (sortType === 'title') {
      return favorites.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortType === 'year') {
      return favorites.sort((a, b) => a.Year.localeCompare(b.Year));
    }
    return favorites;
  }

  /**
   * Navigates back to the previous page.
   */
  goBack() {
    this.router.navigateByUrl('/');
  }
}
