// src/hooks/useIsAdmin.js
import { ADMINS } from '../config/admins';

/**
 * Hook to check if a given user is an admin.
 * 
 * @param {Object|null} user - User object, possibly null.
 * @param {string|number} user.sub - The user's unique identifier.
 * 
 * @returns {boolean} True if user is an admin, false otherwise.
 */
export default function useIsAdmin(user) {
  return !!(user?.sub && ADMINS.includes(String(user.sub)));
}