// src/api/axiosInterceptor.js
import { useEffect } from "react";
import axiosInstance from "./axiosInstance";

const AxiosInterceptor = ({ children }) => {
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // Contoh: tambahkan token auth jika ada
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized, misal redirect ke login
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return children;
};

export default AxiosInterceptor;
