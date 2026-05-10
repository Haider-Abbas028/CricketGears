// AdminDashboard - main admin page
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as adminApi from "../services/adminApi";
import { useAdminData } from "../hooks/useAdminData";
import AdminSidebar from "../components/admin/AdminSidebar";
import ProductsTable from "../components/admin/ProductsTable";
import UsersTable from "../components/admin/UsersTable";
import OrdersTable from "../components/admin/OrdersTable";
import ProductModal from "../components/admin/ProductModal";
import ConfirmModal from "../components/admin/ConfirmModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  // States for tabs aur modals
  const [activeTab, setActiveTab] = useState("products");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Data hook se data lein
  const { products, users, orders, loading, refreshAll } = useAdminData();

  // Admin access check karo
  const isAdmin = useCallback(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return false;
    }
    if (JSON.parse(userData).role !== "admin") {
      navigate("/home");
      return false;
    }
    return true;
  }, [navigate]);

  if (!isAdmin()) return null;

  // Loading state
  if (
    loading.products &&
    loading.users &&
    loading.orders &&
    products.length === 0 &&
    users.length === 0
  ) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  // Product save handler
  const handleSaveProduct = async (formData) => {
    setModalLoading(true);
    try {
      if (editingProduct) {
        await adminApi.updateProduct(editingProduct._id, formData);
      } else {
        await adminApi.addProduct(formData);
      }
      await refreshAll();
      setShowProductModal(false);
      setEditingProduct(null);
    } catch (error) {
      alert(error.response?.data?.message || "Error saving product");
    } finally {
      setModalLoading(false);
    }
  };

  // Product delete handler
  const handleDeleteProduct = async () => {
    if (!deleteTarget) return;
    setModalLoading(true);
    try {
      await adminApi.deleteProduct(deleteTarget);
      await refreshAll();
      setShowConfirmModal(false);
      setDeleteTarget(null);
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting product");
    } finally {
      setModalLoading(false);
    }
  };

  // Delete confirm open karo
  const openDeleteConfirm = (id) => {
    setDeleteTarget(id);
    setShowConfirmModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productsCount={products.length}
        usersCount={users.length}
        ordersCount={orders.length}
      />

      <div className="ml-64 flex-1 p-8">
        {activeTab === "products" && (
          <ProductsTable
            products={products}
            loading={loading.products}
            onAdd={() => {
              setEditingProduct(null);
              setShowProductModal(true);
            }}
            onEdit={(product) => {
              setEditingProduct(product);
              setShowProductModal(true);
            }}
            onDelete={openDeleteConfirm}
          />
        )}
        {activeTab === "users" && (
          <UsersTable
            users={users}
            loading={loading.users}
            onRefresh={refreshAll}
          />
        )}
        {activeTab === "orders" && (
          <OrdersTable
            orders={orders}
            loading={loading.orders}
            onOrderUpdate={refreshAll} // ✅ Yahan change kiya hai
          />
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
          loading={modalLoading}
        />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDeleteProduct}
        onCancel={() => {
          setShowConfirmModal(false);
          setDeleteTarget(null);
        }}
        loading={modalLoading}
      />
    </div>
  );
};

export default AdminDashboard;
