import {getBooksUrl} from "../utils/utils";

/**
 * Fetch book data from the Open Library API.
 * @param {string} query - search query
 * @returns {Promise<Array>} a promise that resolves to an array of book docs
 */
export const fetchBooks = async (query) => {
    try {
        const response = await fetch(getBooksUrl(query));
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        return data.docs;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};