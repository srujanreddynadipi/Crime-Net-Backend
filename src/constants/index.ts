// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// App Configuration
export const APP_NAME = 'Crime Net';
export const APP_VERSION = '1.0.0';

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  THEME: 'theme',
  TOKEN: 'auth_token',
} as const;
