import './style.css';
import { fetchBooks } from './scripts/api';
import { createBookCard, renderLoader, renderMessage, renderFavorites } from './scripts/ui';
import { MESSAGES } from './utils/consts';
import { getFavorites, saveToFavorites, removeFromFavorites, isBookFavorite } from './scripts/storage';
import {initTheme, toggleTheme} from "./scripts/theme";

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-form__input');
const resultsGrid = document.querySelector('#results-grid');
const favoritesList = document.querySelector('#favorites-list');
const themeBtn = document.querySelector('#theme-toggle');

// Internal state to store the latest search results for easy favorite toggling
let currentSearchDocs = [];

const updateFavoritesUI = () => {
    renderFavorites(favoritesList, getFavorites());
};

// initial UI state on page load
const showInitialState = () => {
    renderMessage(resultsGrid, MESSAGES.EMPTY_QUERY);
    updateFavoritesUI();
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    showInitialState();
});

// Handles book search form submission
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    // search query must be at least 3 characters
    if (query.length < 3) {
        renderMessage(resultsGrid, MESSAGES.EMPTY_QUERY);
        return;
    }

    try {
        renderLoader(resultsGrid);
        const books = await fetchBooks(query);

        currentSearchDocs = books;
        resultsGrid.innerHTML = '';

        if (books.length === 0) {
            renderMessage(resultsGrid, MESSAGES.NO_RESULTS, "error");
            return;
        }

        // Render search results
        books.forEach(book => {
            resultsGrid.insertAdjacentHTML('beforeend', createBookCard(book));
        });

    } catch (error) {
        renderMessage(resultsGrid, MESSAGES.ERROR, "error");
    }
});

// Global event listener for favorite buttons using event delegation
const handleToggleFavorite = (e) => {
    const favBtn = e.target.closest('.book__fav-btn') || e.target.closest('.favorites-item__fav-btn');
    if (!favBtn) return;

    const bookCard = favBtn.closest('.book') || favBtn.closest('.favorites-item');
    const bookKey = bookCard.dataset.id;

    if (isBookFavorite(bookKey)) {
        removeFromFavorites(bookKey);
    } else {
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
    const allMainGridBtns = resultsGrid.querySelectorAll(`[data-id="${bookKey}"] .book__fav-btn`);
    allMainGridBtns.forEach(btn => {
        btn.classList.toggle('book__fav-btn--active', isBookFavorite(bookKey));
    });
};

resultsGrid.addEventListener('click', handleToggleFavorite);
favoritesList.addEventListener('click', handleToggleFavorite);

themeBtn.addEventListener('click', () => {
    toggleTheme();
});