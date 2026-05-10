// frontend/src/hooks/useAdminData.js
import { useState, useEffect, useCallback } from "react";
import * as adminApi from "../services/adminApi";

export const useAdminData = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({ products: true, users: true, orders: true });
  const [error, setError] = useState({ products: null, users: null, orders: null });

  const loadProducts = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, products: true }));
      const res = await adminApi.fetchProducts();
      setProducts(res.data.products || []);
      setError(prev => ({ ...prev, products: null }));
    } catch (err) {
      console.error("Products fetch error:", err);
      setError(prev => ({ ...prev, products: err.response?.data?.message || err.message }));
      setProducts([]);
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, users: true }));
      const res = await adminApi.fetchUsers();
      console.log("Users API response:", res.data); // Debug log
      setUsers(res.data.users || []);
      setError(prev => ({ ...prev, users: null }));
    } catch (err) {
      console.error("Users fetch error:", err);
      console.error("Error response:", err.response?.data);
      setError(prev => ({ ...prev, users: err.response?.data?.message || err.message }));
      setUsers([]);
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, orders: true }));
      const res = await adminApi.fetchOrders();
      setOrders(res.data.orders || []);
      setError(prev => ({ ...prev, orders: null }));
    } catch (err) {
      console.error("Orders fetch error:", err);
      setError(prev => ({ ...prev, orders: err.response?.data?.message || err.message }));
      setOrders([]);
    } finally {
      setLoading(prev => ({ ...prev, orders: false }));
    }
  }, []);

  const refreshAll = useCallback(() => {
    loadProducts();
    loadUsers();
    loadOrders();
  }, [loadProducts, loadUsers, loadOrders]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return {
    products,
    users,
    orders,
    loading,
    error,
    refreshAll,
    loadProducts,
    loadUsers,
    loadOrders,
  };
};