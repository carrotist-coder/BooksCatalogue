import './styles/style.css';
import { fetchBooks } from './scripts/api';
import { createBookCard, renderLoader, renderMessage, renderFavorites } from './scripts/ui';
import { MESSAGES, MIN_QUERY_LENGTH } from './utils/consts';
import { getFavorites, saveToFavorites, removeFromFavorites, isBookFavorite } from './scripts/storage';
import { initTheme, toggleTheme } from "./scripts/theme";
import { debounce } from "./utils/debounce";

// DOM
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-form__input');
const resultsGrid = document.querySelector('#results-grid');
const favoritesList = document.querySelector('#favorites-list');
const themeBtn = document.querySelector('#theme-toggle');

// Internal state to store the latest search results for easy favorite toggling
let currentSearchDocs = [];

// Render favorites sidebar and update counter
const updateFavoritesUI = () => renderFavorites(favoritesList, getFavorites());

/**
 * Sync the favorite button states in the main search grid
 * @param {string} bookKey - Unique id for the book
 */
const syncMainGridButtons = (bookKey) => {
    const buttons = resultsGrid.querySelectorAll(`[data-id="${bookKey}"] .book__fav-btn`);
    const isFav = isBookFavorite(bookKey);
    buttons.forEach(btn => btn.classList.toggle('book__fav-btn--active', isFav));
};

/**
 * Fetch books (api) and update the results grid
 * @param {string} query - search query
 */
const performSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
        renderMessage(resultsGrid, MESSAGES.EMPTY_QUERY);
        return;
    }

    try {
        renderLoader(resultsGrid);

        const books = await fetchBooks(trimmedQuery);
        currentSearchDocs = books;
        resultsGrid.innerHTML = '';

        if (books.length === 0) {
            renderMessage(resultsGrid, MESSAGES.NO_RESULTS, "error");
            return;
        }

        books.forEach(book => {
            resultsGrid.insertAdjacentHTML('beforeend', createBookCard(book));
        });

    } catch (error) {
        renderMessage(resultsGrid, MESSAGES.ERROR, "error");
    }
};

// Handles adding/removing books from favorites using event delegation (by clicks on favorite buttons)
const handleToggleFavorite = (e) => {
    const favBtn = e.target.closest('.book__fav-btn') || e.target.closest('.favorites-item__fav-btn');
    if (!favBtn) return;

    const bookCard = favBtn.closest('.book') || favBtn.closest('.favorites-item');
    const bookKey = bookCard.dataset.id;

    if (isBookFavorite(bookKey)) {
        removeFromFavorites(bookKey);
    } else {
        // Find the book data in the current search results to save it
        const bookData = currentSearchDocs.find(b => b.key === bookKey);
        if (bookData) {
            saveToFavorites({
                key: bookData.key,
                title: bookData.title,
                author_name: bookData.author_name,
                year: bookData.first_publish_year,
                cover_i: bookData.cover_i
            });
        }
    }

    updateFavoritesUI();
    syncMainGridButtons(bookKey);
};

// Debounced search handler
const onInputSearch = debounce(() => {
    performSearch(searchInput.value);
});

// Handles book search form submission
const onFormSubmit = (e) => {
    e.preventDefault();
    performSearch(searchInput.value);
};

// Initialization
const init = () => {
    // init theme
    initTheme();

    // initial UI state
    renderMessage(resultsGrid, MESSAGES.EMPTY_QUERY);
    updateFavoritesUI();

    // event listeners
    searchInput.addEventListener('input', onInputSearch);
    searchForm.addEventListener('submit', onFormSubmit);
    resultsGrid.addEventListener('click', handleToggleFavorite);
    favoritesList.addEventListener('click', handleToggleFavorite);
    themeBtn.addEventListener('click', toggleTheme);
};

document.addEventListener('DOMContentLoaded', init);
