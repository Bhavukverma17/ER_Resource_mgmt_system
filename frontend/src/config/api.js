// API configuration for different environments
const API_CONFIG = {
  development: {
    BASE_URL: "http://localhost:5000",
  },
  production: {
    // For Vercel deployment, the API will be served from the same domain
    BASE_URL: process.env.REACT_APP_API_URL || "",
  },
};

const getApiConfig = () => {
  const env = process.env.NODE_ENV || "development";
  return API_CONFIG[env];
};

export const API_BASE_URL = getApiConfig().BASE_URL;
