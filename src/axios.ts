import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost", // Using default Laravel Sail URL
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Function to get CSRF token
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Initialize CSRF protection
const initCSRF = async () => {
  try {
    // First get CSRF cookie if we don't have it
    if (!getCookie("XSRF-TOKEN")) {
      await instance.get("/sanctum/csrf-cookie");
    }
    // Update meta tag with the new token
    const token = getCookie("XSRF-TOKEN");
    if (token) {
      const decodedToken = decodeURIComponent(token);
      document
        .querySelector('meta[name="csrf-token"]')
        ?.setAttribute("content", decodedToken);
    }
  } catch (error) {
    console.error("Error initializing CSRF protection:", error);
    throw error;
  }
};

// Call initCSRF immediately
initCSRF().catch(console.error);

// Add request interceptor
instance.interceptors.request.use(
  async (config) => {
    // Get the CSRF token from cookie
    const token = getCookie("XSRF-TOKEN");
    if (token) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
    } else {
      // If no token, try to get one
      await initCSRF();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
