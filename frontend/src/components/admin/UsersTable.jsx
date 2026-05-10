// UsersTable - users manage karne ka component
import { useState } from "react";
import API_BASE_URL from "../../config/api";
import * as adminApi from "../../services/adminApi";

const UsersTable = ({ users, loading, onRefresh }) => {
  // States for editing aur adding
  const [editingUser, setEditingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    role: "user",
    password: "",
  });

  // Add form state
  const [addForm, setAddForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  // Edit button click handler
  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      password: "",
    });
  };

  // Update user function
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updateData = { ...editForm };
      if (!updateData.password) delete updateData.password;

      await adminApi.updateUser(editingUser._id, updateData);

      if (onRefresh) await onRefresh();
      setEditingUser(null);
      setEditForm({ fullName: "", email: "", role: "user", password: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Error updating user");
    } finally {
      setSaving(false);
    }
  };
  // Add user function
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (addForm.password !== addForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (addForm.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setSaving(true);
    try {
      //  Proper fetch syntax
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: addForm.fullName,
          email: addForm.email,
          password: addForm.password,
          confirmPassword: addForm.confirmPassword,
        }),
      });

      if (response.ok) {
        alert("User added successfully!");
        if (onRefresh) await onRefresh();
        setShowAddModal(false);
        setAddForm({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });
      } else {
        const error = await response.json();
        alert(error.message || "Error adding user");
      }
    } catch (error) {
      alert(error.message || "Error adding user");
    } finally {
      setSaving(false);
    }
  };
  // Delete user function
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await adminApi.deleteUser(id);
      if (onRefresh) await onRefresh();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Loading users...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Users Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
        >
          + Add New User
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-white/10">
            <tr>
              <th className="p-3 text-gray-400">Name</th>
              <th className="p-3 text-gray-400">Email</th>
              <th className="p-3 text-gray-400">Role</th>
              <th className="p-3 text-gray-400">Joined</th>
              <th className="p-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-white/5 hover:bg-slate-900/50"
              >
                <td className="p-3 text-white">{user.fullName}</td>
                <td className="p-3 text-gray-400">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === "admin"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-400 hover:text-blue-300 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No users found. Click "Add New User" to create one.
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Edit User</h2>
              <button
                onClick={() => setEditingUser(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={editForm.fullName}
                onChange={(e) =>
                  setEditForm({ ...editForm, fullName: e.target.value })
                }
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
                required
              />
              <input
                type="password"
                placeholder="New Password (leave blank to keep unchanged)"
                value={editForm.password}
                onChange={(e) =>
                  setEditForm({ ...editForm, password: e.target.value })
                }
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
              />
              <select
                value={editForm.role}
                onChange={(e) =>
                  setEditForm({ ...editForm, role: e.target.value })
                }
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update User"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add New User</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={addForm.fullName}
                onChange={(e) =>
                  setAddForm({ ...addForm, fullName: e.target.value })
                }
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={addForm.email}
                onChange={(e) =>
                  setAddForm({ ...addForm, email: e.target.value })
                }
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
                required
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={addForm.password}
                onChange={(e) =>
                  setAddForm({ ...addForm, password: e.target.value })
                }
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={addForm.confirmPassword}
                onChange={(e) =>
                  setAddForm({ ...addForm, confirmPassword: e.target.value })
                }
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
                required
              />
              <select
                value={addForm.role}
                onChange={(e) =>
                  setAddForm({ ...addForm, role: e.target.value })
                }
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
