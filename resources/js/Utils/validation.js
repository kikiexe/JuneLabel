/**
 * Input Validation & Sanitization Utilities
 * Helper functions untuk validasi dan sanitasi input user
 */

/**
 * Sanitize string untuk mencegah XSS
 * @param {string} str - String yang akan disanitasi
 * @returns {string} - String yang sudah bersih
 */
export const sanitizeString = (str) => {
    if (typeof str !== 'string') return '';
    
    // Remove HTML tags dan script tags
    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();
};

/**
 * Sanitize HTML untuk mencegah XSS tapi allow safe tags
 * @param {string} html - HTML string
 * @returns {string} - Safe HTML
 */
export const sanitizeHTML = (html) => {
    if (typeof html !== 'string') return '';
    
    // Remove dangerous tags
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/on\w+="[^"]*"/g, '') // Remove event handlers
        .replace(/on\w+='[^']*'/g, '')
        .trim();
};

/**
 * Validasi email format
 * @param {string} email - Email address
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

/**
 * Validasi nomor telepon Indonesia
 * @param {string} phone - Phone number
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
    if (!phone || typeof phone !== 'string') return false;
    
    // Remove spaces, dashes, parentheses
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    // Check if starts with +62, 62, or 0 and has 9-13 digits
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    return phoneRegex.test(cleaned);
};

/**
 * Format nomor telepon ke format Indonesia standard
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhone = (phone) => {
    if (!phone) return '';
    
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    // Convert to +62 format
    if (cleaned.startsWith('0')) {
        return '+62' + cleaned.substring(1);
    } else if (cleaned.startsWith('62')) {
        return '+' + cleaned;
    } else if (cleaned.startsWith('+62')) {
        return cleaned;
    }
    
    return cleaned;
};

/**
 * Validasi password strength
 * @param {string} password - Password
 * @returns {object} - { valid: boolean, message: string, strength: string }
 */
export const validatePassword = (password) => {
    if (!password || typeof password !== 'string') {
        return { valid: false, message: 'Password is required', strength: 'none' };
    }
    
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) {
        return { 
            valid: false, 
            message: `Password must be at least ${minLength} characters`, 
            strength: 'weak' 
        };
    }
    
    let strength = 'weak';
    let strengthScore = 0;
    
    if (password.length >= minLength) strengthScore++;
    if (hasUpperCase) strengthScore++;
    if (hasLowerCase) strengthScore++;
    if (hasNumbers) strengthScore++;
    if (hasSpecialChar) strengthScore++;
    
    if (strengthScore >= 4) {
        strength = 'strong';
    } else if (strengthScore >= 3) {
        strength = 'medium';
    }
    
    const valid = strengthScore >= 3;
    const message = valid 
        ? 'Password is valid' 
        : 'Password should contain uppercase, lowercase, and numbers';
    
    return { valid, message, strength };
};

/**
 * Sanitize form data object
 * @param {object} formData - Form data object
 * @returns {object} - Sanitized form data
 */
export const sanitizeFormData = (formData) => {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(formData)) {
        if (typeof value === 'string') {
            sanitized[key] = sanitizeString(value);
        } else if (Array.isArray(value)) {
            sanitized[key] = value.map(item => 
                typeof item === 'string' ? sanitizeString(item) : item
            );
        } else {
            sanitized[key] = value;
        }
    }
    
    return sanitized;
};

/**
 * Escape special characters untuk SQL prevention (extra layer)
 * @param {string} str - String to escape
 * @returns {string}
 */
export const escapeSpecialChars = (str) => {
    if (typeof str !== 'string') return '';
    
    return str
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\x00/g, '\\0')
        .replace(/\x1a/g, '\\Z');
};

/**
 * Validasi URL format
 * @param {string} url - URL string
 * @returns {boolean}
 */
export const validateURL = (url) => {
    if (!url || typeof url !== 'string') return false;
    
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Sanitize URL untuk mencegah javascript: atau data: protocols
 * @param {string} url - URL string
 * @returns {string|null} - Safe URL atau null
 */
export const sanitizeURL = (url) => {
    if (!url || typeof url !== 'string') return null;
    
    const trimmed = url.trim().toLowerCase();
    
    // Prevent dangerous protocols
    if (
        trimmed.startsWith('javascript:') ||
        trimmed.startsWith('data:') ||
        trimmed.startsWith('vbscript:')
    ) {
        return null;
    }
    
    return url.trim();
};

export default {
    sanitizeString,
    sanitizeHTML,
    validateEmail,
    validatePhone,
    formatPhone,
    validatePassword,
    sanitizeFormData,
    escapeSpecialChars,
    validateURL,
    sanitizeURL,
};
