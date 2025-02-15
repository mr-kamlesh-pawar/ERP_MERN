import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for easier cookie handling

// Create an axios instance with default headers
const axiosInstance = axios.create({
  baseURL: "https://rmd-erp-server.vercel.app/api/faculty",
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // Get token from cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
