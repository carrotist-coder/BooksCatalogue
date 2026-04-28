import {THEME_KEY, THEMES} from "../utils/consts";

export const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY) || THEMES.LIGHT;
    document.documentElement.setAttribute('data-theme', savedTheme);
    return savedTheme;
};

export const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);

    return newTheme;
};