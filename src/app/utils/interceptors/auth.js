import axios from "axios";
import { AUTH_URL } from "../constants/constants";

const http = axios.create({
  baseURL: AUTH_URL,
});

// Request Interceptor
http.interceptors.request.use(
  (config) => {
    const token =
       localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
