import axios, { AxiosInstance } from "axios";
// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://54.153.65.57/api", // Set base URL from environment variables
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add Authorization token to headers if it exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Directly return the response data for successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response Error:", error.response);
      if (error.response.status === 401) {
        // Handle Unauthorized (401) - Token expired or invalid
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      } else if (error.response.status === 500) {
        // Handle server errors
        alert("A server error occurred. Please try again later.");
      }
    } else if (error.request) {
      // No response received from the server
      console.error("No Response Received:", error.request);
      alert("Network error. Please check your internet connection.");
    } else {
      // Error setting up the request
      console.error("Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
