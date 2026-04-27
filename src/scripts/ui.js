import {formatAuthors, formatYear, getCoverUrl, getFavouriteCounterText} from "../utils/utils";
import {MESSAGES} from "../utils/consts";
import {isBookFavorite} from "./storage";

export const createBookCard = (book) => {
    const { title, author_name, first_publish_year, cover_i, key } = book;
    const isFavorite = isBookFavorite(key);
    const coverUrl = getCoverUrl(cover_i);

    return `
        <div class="book" data-id="${key}">
            <div class="book__image-wrapper">
                <img class="book__image" src=${coverUrl} alt=${title} loading="lazy">
            </div>
            <div class="book__info">
                <p class="book__title">${title}</p>
                <p class="book__author">${formatAuthors(author_name)}</p>
                <p class="book__year">${formatYear(first_publish_year)}</p>
            </div>
            <div class="book__fav-wrapper">
                <svg class="book__fav-btn ${isFavorite ? 'book__fav-btn--active' : ''}">
                    <use href="assets/heart.svg"></use>
                </svg>
            </div>
        </div>
    `;
};

export const createFavoriteItem = (book) => {
    return `
        <div class="favorites-item" data-id="${book.key}">
            <div class="favorites-item__info">
                <img class="favorites-item__image" src=${getCoverUrl(book.cover_i)} alt="${book.title}" loading="lazy">
                <div class="favorites-item__text-info">
                    <p class="favorites-item__title">${book.title}</p>
                    <p class="favorites-item__author">${formatAuthors(book.author_name)}</p>
                    <p class="favorites-item__year">${formatYear(book.year)}</p>
                </div>
            </div>
            <div class="favorites-item__fav-wrapper">
                <svg class="favorites-item__fav-btn">
                    <use href="assets/heart.svg"></use>
                </svg>
            </div>
        </div>
    `;
};

export const renderFavorites = (container, favorites) => {
    const counter = document.querySelector('#favorites-count');
    if (counter) counter.textContent = getFavouriteCounterText(favorites.length);

    if (favorites.length) {
        container.innerHTML = favorites.map(book => createFavoriteItem(book)).join('');
    } else {
        renderMessage(container, MESSAGES.NO_FAVORITES)
    }
};


// Universal function for message output
export const renderMessage = (container, text, type = 'info') => {
    container.innerHTML = `
        <div class="message message--${type}">
            <p class="message__text">${text}</p>
        </div>
    `;
};


// Loader + loading message
export const renderLoader = (container) => {
    container.innerHTML = `
        <div class="loader">
            <div class="loader__spinner"></div>
            <p>${MESSAGES.LOADING}</p>
        </div>
    `;
};