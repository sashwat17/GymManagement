/**
 * Central place for environment-driven config.
 * Add matching values to a `.env` file at the project root:
 *
 *   VITE_API_BASE_URL=https://api.yourapp.com
 */
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
};

if (!env.apiBaseUrl && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[env] VITE_API_BASE_URL is not set. Add it to your .env file, e.g. VITE_API_BASE_URL=http://localhost:4000',
  );
}
