// Configuration constants for the app
export const Config = {
  // API Configuration
  API: {
    // Base URL for the CROUStillant API
    BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.croustillant.menu',
    // version of the API
    VERSION: process.env.EXPO_PUBLIC_API_VERSION || 'v1',
  },
  
  // App Configuration
  APP: {
    NAME: 'CROUStillant',
    VERSION: '1.0.0',
  },
  
  // External URLs
  EXTERNAL: {
    GITHUB_REPO: 'https://github.com/CROUStillant-Developpement',
    GITHUB_WEB_REPO: 'https://github.com/CROUStillant-Developpement/CROUStillantWeb/tree/main/public',
    LEGAL_PAGE: 'https://croustillant.menu/fr/legal',
    ABOUT_PAGE: 'https://croustillant.menu/fr/about',
  },
} as const;

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = Config.API.BASE_URL;
  return `${baseUrl}/${Config.API.VERSION}/${endpoint}`;
};