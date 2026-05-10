// frontend/src/components/admin/OrdersTable.jsx

import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

const OrdersTable = ({ orders, onOrderUpdate }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [localOrders, setLocalOrders] = useState(orders);
  const API = `${API_BASE_URL}/api`;

  // Update local orders when parent orders change
  useState(() => {
    setLocalOrders(orders);
  }, [orders]);

  // Function to update order status via API
  const updateOrderStatus = async (id, status) => {
    setUpdatingStatus(true);
    try {
      const response = await axios.put(`${API}/orders/${id}`, { status });

      if (response.data.success) {
        // ✅ Update local state immediately
        setLocalOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, status: status } : order,
          ),
        );

        // ✅ Update selected order if modal is open
        if (selectedOrder && selectedOrder._id === id) {
          setSelectedOrder((prev) => ({ ...prev, status: status }));
        }

        // ✅ Refresh from backend in background
        if (onOrderUpdate) {
          await onOrderUpdate();
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Status update error:", error);
      alert(error.response?.data?.message || "Failed to update status");
      return false;
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Function to handle status change in table
  const handleStatusChange = async (id, newStatus) => {
    await updateOrderStatus(id, newStatus);
  };

  // Function to handle status change in modal
  const handleModalStatusChange = async (newStatus) => {
    const success = await updateOrderStatus(selectedOrder._id, newStatus);
    if (success) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/20 text-green-400";
      case "shipped":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Orders Management</h1>
        <p className="text-gray-400">Total Orders: {localOrders.length}</p>
      </div>

      {localOrders.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900 border-b border-white/10">
              <tr>
                <th className="p-3 text-gray-400">Order ID</th>
                <th className="p-3 text-gray-400">Customer</th>
                <th className="p-3 text-gray-400">Email</th>
                <th className="p-3 text-gray-400">Items</th>
                <th className="p-3 text-gray-400">Total</th>
                <th className="p-3 text-gray-400">Status</th>
                <th className="p-3 text-gray-400">Date</th>
                <th className="p-3 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-white/5 hover:bg-slate-900/50"
                >
                  <td className="p-3 text-white font-mono text-sm">
                    {order._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="p-3 text-white">{order.customerName}</td>
                  <td className="p-3 text-gray-400">{order.customerEmail}</td>
                  <td className="p-3 text-gray-400">
                    {order.items?.length || 0} items
                  </td>
                  <td className="p-3 text-amber-400 font-semibold">
                    ₨ {order.totalAmount?.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={updatingStatus}
                      className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)} border-none focus:outline-none`}
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="shipped">🚚 Shipped</option>
                      <option value="delivered">✅ Delivered</option>
                    </select>
                  </td>
                  <td className="p-3 text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-800 rounded-lg">
                <div>
                  <p className="text-gray-400 text-sm">Order ID</p>
                  <p className="text-white font-mono">{selectedOrder._id}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Customer</p>
                  <p className="text-white">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{selectedOrder.customerEmail}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-gray-400 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-amber-400 font-semibold">
                        ₨ {item.price?.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-gray-400">Total Amount:</span>
                <span className="text-2xl font-bold text-amber-400">
                  ₨ {selectedOrder.totalAmount?.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-400">Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleModalStatusChange(e.target.value)}
                  disabled={updatingStatus}
                  className={`px-3 py-1 rounded ${getStatusColor(selectedOrder.status)} border-none focus:outline-none`}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
