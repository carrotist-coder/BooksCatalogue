import {DEBOUNCE_TIMEOUT_MS} from "./consts";

/**
 * Prevent a function from being called too frequently
 * @param {Function} fn - the function to debounce
 * @param {number} ms - delay (milliseconds)
 */
export const debounce = (fn, ms = DEBOUNCE_TIMEOUT_MS) => {
    let timeout;
    return function () {
        const fnCall = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
    };
};