import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FavoritesService } from 'src/service/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
[x: string]: any;
  favorites: any[] = [];
  filteredFavorites: any[] = [];
  filterForm!: FormGroup;
  ratingForms: FormGroup[] = [];
  commentForms: FormGroup[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadFavorites();
    this.initializeForm();
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
    this.filteredFavorites = [...this.favorites];

    // Initialize rating and comment forms for each favorite
    this.filteredFavorites.forEach((favorite) => {
      const ratingForm = this.fb.group({
        rating: [
          favorite.rating || '',
          [Validators.required, Validators.min(1), Validators.max(5)],
        ],
      });
      const commentForm = this.fb.group({
        comment: [
          localStorage.getItem(`comment_${favorite.imdbID}`) || '',
          Validators.maxLength(200),
        ],
      });
      this.ratingForms.push(ratingForm);
      this.commentForms.push(commentForm);
    });
  }

  saveRating(index: number) {
    const ratingValue = this.ratingForms[index].get('rating')?.value;
    localStorage.setItem(
      `rating_${this.filteredFavorites[index].imdbID}`,
      ratingValue
    );
  }
  comment: string = ''

  saveComment(index: number) {
    const commentValue = this.commentForms[index].get('comment')?.value;
    localStorage.setItem(
      `comment_${this.filteredFavorites[index].imdbID}`,
      commentValue
    );

    this.comment = commentValue
    console.log(commentValue)
  }

  removeFromFavorites(movie: any) {
    this.favoritesService.removeFavorite(movie);
    this.loadFavorites();
  }

  initializeForm() {
    this.filterForm = this.fb.group({
      sortType: [''],
      yearFilter: [''],
      typeFilter: [''],
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters() {
    let filtered = [...this.favorites];

    if (this.filterForm.value.yearFilter) {
      filtered = filtered.filter(
        (favorite) => favorite.Year === this.filterForm.value.yearFilter
      );
    }

    if (this.filterForm.value.typeFilter) {
      filtered = filtered.filter(
        (favorite) => favorite.Type === this.filterForm.value.typeFilter
      );
    }

    if (this.filterForm.value.sortType === 'title') {
      filtered.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (this.filterForm.value.sortType === 'year') {
      filtered.sort((a, b) => a.Year.localeCompare(b.Year));
    }

    this.filteredFavorites = filtered;
  }
}
