import {BASE_URL, COVERS_URL, MESSAGES, NO_IMAGE_FILENAME} from "./consts";

// full API URL for a search query
export const getBooksUrl = (query) => `${BASE_URL}?q=${encodeURIComponent(query)}`;

// cover image URL or a fallback
export const getCoverUrl = (coverId) => {
    return coverId
        ? `${COVERS_URL}/${coverId}.jpg`
        : `./${NO_IMAGE_FILENAME}`;
};

// formatting helpers for UI display
export const getFavouriteCounterText = (count) => `${count} books saved`;
export const formatAuthors = (authors) => authors ? authors.join(', ') : MESSAGES.UNKNOWN_AUTHOR;
export const formatYear = (year) => year || MESSAGES.UNKNOWN_YEAR;