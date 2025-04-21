import axios from 'axios';
import { BASE_URL } from "../constants/constants";

const http = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor
http.interceptors.request.use(
  (config) => {
    // Add token or custom headers
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;