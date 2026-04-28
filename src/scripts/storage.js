import {STORAGE_KEY} from "../utils/consts";

/**
 * Retrieves the list of favorite books from LocalStorage
 * @returns {Array} array of saved book objects
 */
export const getFavorites = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

/**
 * Add a book to the favorites list in LocalStorage
 * @param {Object} book - the book object to save
 */
export const saveToFavorites = (book) => {
    const favorites = getFavorites();
    if (!favorites.some(fav => fav.key === book.key)) {
        favorites.push(book);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
};

/**
 * Removes a book from favorites by its unique key
 * @param {string} bookKey - the unique id of the book
 */
export const removeFromFavorites = (bookKey) => {
    const favorites = getFavorites();
    const updated = favorites.filter(fav => fav.key !== bookKey);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

/**
 * Check if a specific book is already in the favorites list
 * @param {string} bookKey - The unique id of the book
 * @returns {boolean}
 */
export const isBookFavorite = (bookKey) => {
    return getFavorites().some(fav => fav.key === bookKey);
};