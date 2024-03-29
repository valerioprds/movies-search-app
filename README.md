# Controlli App

## Introduction

Welcome to the **Controlli** App! This is an Angular-based application that allows users to search for movies, add them to favorites, and manage their favorite list with personalized comments.

## Getting Started

To get started with Controlli, follow these simple steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/valerioprds/prueba-controlli.git
    ```

2. **Install dependencies:**
    Navigate to the project directory and run:
    ```bash
    npm install
    ```

3. **Start the application:**
    ```bash
    npm start
    ```
4. **change the URL of the API:**
   change the baseUrl in order for the app to work. you can get your API key from here  https://www.omdbapi.com/ 
## Features

- Movie Search
- Add movies to Favorites
- View and manage Favorites list

## Technologies Used

- Angular (Version 16.2.0)
- RxJS (Version 7.8.0)
- Angular CLI (Version 16.2.10)

## Application Structure

- `MoviesService`: Handles API calls to fetch movie data.
- `FavoritesService`: Manages favorite movies in local storage.
- `SearchComponent`: Component for searching movies.
- `FavoritesComponent`: Component for displaying and managing favorites.

## Scripts

- **Start App**: `ng serve -o`
- **Build**: `ng build`
- **Watch**: `ng build --watch --configuration development`
- **Test**: `ng test`

## Dependencies

- Angular Core and related modules
- ngx-toastr for notifications
- TypeScript, Jasmine, Karma for development and testing

## Contributing

Contributions to **Controlli** are welcome. Please follow standard coding practices and submit your pull requests for review.

---

Enjoy using **Controlli** for your movie explorations! 🎬🍿
