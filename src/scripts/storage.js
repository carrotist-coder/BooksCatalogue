import {STORAGE_KEY} from "../utils/consts";


export const getFavorites = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveToFavorites = (book) => {
    const favorites = getFavorites();
    if (!favorites.some(fav => fav.key === book.key)) {
        favorites.push(book);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
};

export const removeFromFavorites = (bookKey) => {
    const favorites = getFavorites();
    const updated = favorites.filter(fav => fav.key !== bookKey);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const isBookFavorite = (bookKey) => {
    return getFavorites().some(fav => fav.key === bookKey);
};