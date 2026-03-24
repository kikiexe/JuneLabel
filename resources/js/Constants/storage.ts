/**
 * Local Storage Keys Configuration
 * Centralized storage key constants to prevent typos
 */

export const STORAGE_KEYS = {
  CART: 'junelabel_cart',
  USER_PREFERENCES: 'junelabel_preferences',
  THEME: 'junelabel_theme',
} as const;

/**
 * Local Storage Helper Functions
 */

export const storage = {
  /**
   * Get item from localStorage
   * @param key - Storage key
   * @param defaultValue - Default value if key doesn't exist
   */
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);
      return defaultValue;
    }
  },

  /**
   * Set item to localStorage
   * @param key - Storage key
   * @param value - Value to store
   */
  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to set item to localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param key - Storage key
   */
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Failed to clear localStorage', error);
      return false;
    }
  },
};
