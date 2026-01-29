/**
 * Input Validation & Sanitization Utilities
 * Helper functions untuk validasi dan sanitasi input user
 */

/**
 * Sanitize string untuk mencegah XSS
 * @param str - String yang akan disanitasi
 * @returns - String yang sudah bersih
 */
export const sanitizeString = (str: any): string => {
  if (typeof str !== 'string') return '';

  // Remove HTML tags dan script tags
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
};

/**
 * Sanitize HTML untuk mencegah XSS tapi allow safe tags
 * @param html - HTML string
 * @returns - Safe HTML
 */
export const sanitizeHTML = (html: any): string => {
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
 * @param email - Email address
 * @returns
 */
export const validateEmail = (email: any): boolean => {
  if (!email || typeof email !== 'string') return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validasi nomor telepon Indonesia
 * @param phone - Phone number
 * @returns
 */
export const validatePhone = (phone: any): boolean => {
  if (!phone || typeof phone !== 'string') return false;

  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');

  // Check if starts with +62, 62, or 0 and has 9-13 digits
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Format nomor telepon ke format Indonesia standard
 * @param phone - Phone number
 * @returns - Formatted phone number
 */
export const formatPhone = (phone: any): string => {
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

export interface PasswordValidationResult {
  valid: boolean;
  message: string;
  strength: 'weak' | 'medium' | 'strong' | 'none';
}

/**
 * Validasi password strength
 * @param password - Password
 * @returns - { valid: boolean, message: string, strength: string }
 */
export const validatePassword = (password: any): PasswordValidationResult => {
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
      strength: 'weak',
    };
  }

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
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
 * @param formData - Form data object
 * @returns - Sanitized form data
 */
export const sanitizeFormData = (formData: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
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
 * @param str - String to escape
 * @returns
 */
export const escapeSpecialChars = (str: any): string => {
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
 * @param url - URL string
 * @returns
 */
export const validateURL = (url: any): boolean => {
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
 * @param url - URL string
 * @returns - Safe URL atau null
 */
export const sanitizeURL = (url: any): string | null => {
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

const validation = {
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

export default validation;
