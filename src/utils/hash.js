import { SHA256 } from 'crypto-js';

/**
 * Creates a SHA-256 hash from a string input
 * Used for tracking if content has changed to avoid redundant API calls
 * 
 * @param {string} text - The text to hash
 * @returns {string} - The hashed string
 */
export const hashText = (text) => {
  return SHA256(text).toString();
};

/**
 * Checks if two texts are equivalent by comparing their hashes
 * 
 * @param {string} text1 - First text to compare
 * @param {string} text2 - Second text to compare
 * @returns {boolean} - Whether the texts are equivalent
 */
export const areTextsEquivalent = (text1, text2) => {
  return hashText(text1) === hashText(text2);
}; 