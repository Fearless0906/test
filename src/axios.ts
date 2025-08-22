import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost", // Use env variable with fallback
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add response interceptor for debugging
instance.interceptors.response.use(
  (response) => {
    console.log("Response:", {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Request failed:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

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
    // Get CSRF token from our endpoint
    const response = await instance.get("/api/csrf-token");
    const { token } = response.data;

    if (token) {
      // Set the token in a cookie
      document.cookie = `XSRF-TOKEN=${token}; path=/`;
      // Update meta tag
      document
        .querySelector('meta[name="csrf-token"]')
        ?.setAttribute("content", token);
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
