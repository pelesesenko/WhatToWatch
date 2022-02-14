export const ActionTypes = {
  filmsRecieved: `films/films-recieved`,
  fetchFilms: `films/fetch-films`,
  fetchFilmById: `films/fetch-film-by-id`,
  fetchFilmPromo: `films/fetch-film-promo`,
  genreChanged: `films/genre-changed`,
  catalogSizeIncremented: `films/catalog-size-incremented`,
  clearFilms: `films/clear-films`,

  fetchFilmReviews: `film-info/fetch-reviews`,
  postFilmReview: `film-info/post-review`,
  currentTabChanged: `film-info/current-tab-changed`,

  fetchFavFilms: `fav-films/fetch-fav-films`,
  postFavStatus: `fav-films/post-fav-status`,
  clearFavFilms: `fav-films/clear-fav-films`,

  fetchAuth: `user/fetch-authorization`,
  login: `user/login`,
  logout: `user/logout`,
  authorizationDenied: `user/authorizationDenied`,

  serverAvailabilityChecked: `server/availabilityChecked`,
} as const;
