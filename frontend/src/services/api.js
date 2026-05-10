import axios from 'axios';
import API_BASE_URL from '../config/api';

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Products API
export const fetchProducts = (category) => {
  if (category && category !== 'all') {
    return API.get(`/products?category=${category}`);
  }
  return API.get('/products');
};

export const fetchProductById = (id) => API.get(`/products/${id}`);