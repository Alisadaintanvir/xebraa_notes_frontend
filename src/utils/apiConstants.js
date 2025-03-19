// Define constants for API configuration
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const API_CONFIG = {
  API_ENDPOINT: isLocalhost
    ? "http://localhost:8000"
    : "https://xebraanote-1ikydaco.b4a.run",
  DOMAIN_URL: isLocalhost ? "http://localhost:5173" : "",
};

// Freeze the API configuration object to make it immutable
Object.freeze(API_CONFIG);

// Export the API configuration object for use in other modules
export default API_CONFIG;
