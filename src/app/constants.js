export const PUBLIC_PATHS = {
  LOGIN: '/',
  SIGNUP: '/signup',
  FORGOTPASSWORD: '/forgot-password',
  CHECKEMAIL: '/check-email',
  ACCOUNT_SETUP: '/account-setup',
  BANK_INFORMATION: '/bank-information',
  RESETPASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
};

/**
 * Paths available to users who are  logged in
 * @constant
 */

export const PROTECTED_PATHS = {
  DASHBOARD: '/dashboard',
  USERS: '/users',
  MERCHANTS: '/merchants',
  TRANSACTIONS: '/transactions',
  LOANS: '/loans',
  SETTINGS: '/settings',
  ROLES: '/roles',
  BANKS: '/banks',
};

/**
 * the number of table rows data that will be display
 * @constant
 */
export const DATA_ROWS = {
  LIMIT: 10,
};
