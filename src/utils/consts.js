export const BASE_URL = 'https://openlibrary.org/search.json';
export const COVERS_URL = 'https://covers.openlibrary.org/b/id';
export const NO_IMAGE_FILENAME = 'assets/no-cover.svg';

export const MIN_QUERY_LENGTH = 3;

export const MESSAGES = {
    LOADING: 'Loading...',
    NO_RESULTS: 'No books found. Try another search.',
    ERROR: 'Network error. Please try again later.',
    EMPTY_QUERY: `Please enter a book title, author or keyword (${MIN_QUERY_LENGTH}+ characters)`,
    NO_FAVORITES: 'No favorites yet',
    UNKNOWN_AUTHOR: 'Unknown Author',
    UNKNOWN_YEAR: 'N/A'
};

export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
};

export const STORAGE_KEY = 'library_favorites';
export const THEME_KEY = 'library_theme';

export const DEBOUNCE_TIMEOUT_MS = 500;
