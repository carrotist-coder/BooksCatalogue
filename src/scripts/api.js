import {getBooksUrl} from "../utils/utils";

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