/**
 * Generates a unique ID using timestamp and random string
 * @returns {string} Unique identifier
 */
export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Formats a date object into a human-readable string
 * @param date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Validates if a string is not empty after trimming
 * @param value - The string to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidString = (value: string): boolean => {
    return value.trim().length > 0;
};

/**
 * Validates note form data
 * @param title - Note title
 * @param description - Note description
 * @returns {boolean} True if valid, false otherwise
 */
export const validateNoteForm = (title: string, description: string): boolean => {
    return isValidString(title) && isValidString(description);
};
