/**
 * Sets value to local storage
 *
 * @param {string} key
 * @param {*} value
 */
export const localStorageSet = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Gets value from local storage
 *
 * @param {string} key
 */
export const localStorageGet = (key) => JSON.parse(localStorage.getItem(key));