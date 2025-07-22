/**
 * API configuration utility to handle different environments
 */

// Get the base API URL based on environment
export const getApiBaseUrl = (): string => {
  // Use environment variable if available, otherwise use the default
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Check if we're in a production environment
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Use the production URL in production, localhost in development
  return isProduction 
    ? 'https://smart-ping-backend.vercel.app' 
    : 'http://localhost:5000';
};

// Helper function to construct API endpoints
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  // Ensure endpoint starts with '/api/'
  if (!endpoint.startsWith('/api/')) {
    endpoint = `/api/${endpoint.replace(/^\//, '')}`;
  }
  
  // Combine base URL with endpoint
  return `${baseUrl}${endpoint}`;
};