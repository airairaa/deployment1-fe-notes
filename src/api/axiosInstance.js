import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// Interceptor untuk menambahkan token ke header Authorization
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // atau dari context/state
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
