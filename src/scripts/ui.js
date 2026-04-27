import {formatAuthors, getCoverUrl} from "../utils/utils";
import {MESSAGES} from "../utils/consts";

export const createBookCard = (book, isFavorite = false) => {
    const { title, author_name, first_publish_year, cover_i } = book;
    const coverUrl = getCoverUrl(cover_i);

    return `
        <div class="book">
            <div class="book__image-wrapper">
                <img class="book__image" src=${coverUrl} alt=${title}>
            </div>
            <div class="book__info">
                <p class="book__title">${title}</p>
                <p class="book__author">${formatAuthors(author_name)}</p>
                <p class="book__year">${first_publish_year || MESSAGES.UNKNOWN_YEAR}</p>
            </div>
            <div class="book__fav-wrapper">
                <svg class="book__fav-btn ${isFavorite ? 'book__fav-btn--active' : ''}">
                    <use href="assets/heart.svg"></use>
                </svg>
            </div>
        </div>
    `;
};

// Универсальная функция для вывода сообщений
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