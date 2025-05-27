// src/utils.js

// Base URL untuk API backend Anda
export const BASE_URL = "http://localhost:5000/api";


const TOKEN_KEY = "accessToken";

// Simpan token ke localStorage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Ambil token dari localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Hapus token dari localStorage (misal saat logout)
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Fungsi fetch dengan otentikasi token
export const authFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    // Token invalid atau expired, hapus token dan redirect ke login
    removeToken();
    window.location.href = "/login";
  }

  return response;
};
