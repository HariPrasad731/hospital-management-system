// src/utils/storage.jsx

/**
 * Get data from localStorage
 * @param {string} key
 * @param {*} defaultValue
 */
export const getFromStorage = (key, defaultValue = []) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error("Error reading localStorage", error);
    return defaultValue;
  }
};

/**
 * Save data to localStorage
 * @param {string} key
 * @param {*} value
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

/**
 * Remove data from localStorage
 * @param {string} key
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage key", error);
  }
};
