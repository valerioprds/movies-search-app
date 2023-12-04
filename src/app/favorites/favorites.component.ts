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

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
    this.filteredFavorites = [...this.favorites];

    this.filteredFavorites.forEach((favorite, index) => {
      const commentForm = this.fb.group({
        comment: [
          localStorage.getItem(`comment_${favorite.imdbID}`) || '',
          Validators.maxLength(200),
        ],
      });

      this.commentForms.push(commentForm);

      // Initialize the comment from localStorage
      favorite.comment =
        localStorage.getItem(`comment_${favorite.imdbID}`) || '';
    });
  }

  saveComment(index: number) {
    const commentValue = this.commentForms[index].get('comment')?.value;
    localStorage.setItem(
      `comment_${this.filteredFavorites[index].imdbID}`,
      commentValue
    );

    // Update the comment in the filteredFavorites array
    this.filteredFavorites[index].comment = commentValue;
  }

  removeFromFavorites(movie: any) {
    this.favoritesService.removeFavorite(movie);
    this.toastr.success('Movie deleted from Favorites', 'Success!');
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

  goBack() {
    this.router.navigateByUrl('/');
  }
}
