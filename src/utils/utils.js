import {BASE_URL, COVERS_URL, MESSAGES, NO_IMAGE_FILENAME} from "./consts";

export const getBooksUrl = (query) => `${BASE_URL}?q=${encodeURIComponent(query)}`;

export const getCoverUrl = (coverId) => {
    return coverId
        ? `${COVERS_URL}/${coverId}.jpg`
        : NO_IMAGE_FILENAME;
};

export const getFavouriteCounterText = (count) => `${count} books saved`;
export const formatAuthors = (authors) => authors ? authors.join(', ') : MESSAGES.UNKNOWN_AUTHOR;
export const formatYear = (year) => year || MESSAGES.UNKNOWN_YEAR;