import './style.css';
import { fetchBooks } from './scripts/api';
import {createBookCard, renderLoader, renderMessage} from './scripts/ui';
import {MESSAGES} from "./utils/consts";

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-form__input');
const resultsGrid = document.querySelector('#results-grid');

const showInitialState = () => {
    renderMessage(resultsGrid, MESSAGES.EMPTY_QUERY);
};

document.addEventListener('DOMContentLoaded', showInitialState);

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    console.log(query);
    if (!query) return; // not sure yet

    try {
        renderLoader(resultsGrid);
        const books = await fetchBooks(query);
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
});