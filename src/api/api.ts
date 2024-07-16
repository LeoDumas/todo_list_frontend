// src/api/api.ts
import axios from "axios";
import Cookies from "js-cookie";

// Axios object
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Interceptors are used to add the JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
