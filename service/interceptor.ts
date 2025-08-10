import axios from "axios";
const APIClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
 
});

// Request interceptor
APIClient.interceptors.request.use(
  (config) => {
    // Example: Add token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
APIClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Optional: Handle token expiration globally
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized
      console.error("Unauthorized access - possibly redirect to login.");
    }
    return Promise.reject(error);
  }
);

export default APIClient;
