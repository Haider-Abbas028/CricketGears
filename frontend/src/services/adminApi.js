// frontend/src/services/adminApi.js
import axios from "axios";
import API_BASE_URL from '../config/api';

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// ✅ Add token to every request automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Products
export const fetchProducts = () => API.get("/products");
export const addProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Users
export const fetchUsers = () => API.get("/auth/users");
export const updateUser = (id, data) => API.put(`/auth/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/auth/users/${id}`);

// Orders
export const fetchOrders = () => API.get("/orders");
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}`, { status });

export default API;