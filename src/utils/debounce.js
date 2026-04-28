import {DEBOUNCE_TIMEOUT_MS} from "./consts";

export const debounce = (fn, ms = DEBOUNCE_TIMEOUT_MS) => {
    let timeout;
    return function () {
        const fnCall = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
    };
};