import axios from 'axios';

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Set your backend base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally, you can add interceptors to modify requests or responses
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authentication tokens or other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
