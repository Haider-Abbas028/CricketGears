// frontend/src/components/admin/ProductModal.jsx
import { useState } from "react";

const ProductModal = ({ product, onSave, onClose, loading }) => {
  const isEditing = !!product;

  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || "bats",
    brand: product?.brand || "",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
    rating: product?.rating || 4,
    priceOptions: product?.priceOptions || [
      { type: "Standard", price: 0, stock: 0 },
    ],
  });

  const categories = ["bats", "balls", "kits"]; //  Sirf Bats, Balls, Kits

  const addPriceOption = () => {
    setForm({
      ...form,
      priceOptions: [...form.priceOptions, { type: "", price: 0, stock: 0 }],
    });
  };

  const updatePriceOption = (index, field, value) => {
    const newOptions = [...form.priceOptions];
    newOptions[index][field] = value;
    setForm({ ...form, priceOptions: newOptions });
  };

  const removePriceOption = (index) => {
    const newOptions = form.priceOptions.filter((_, i) => i !== index);
    setForm({ ...form, priceOptions: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10"
              required
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10"
              required
            />
            <input
              type="number"
              placeholder="Rating (0-5)"
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: parseFloat(e.target.value) })
              }
              className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10"
              step="0.1"
              min="0"
              max="5"
            />
          </div>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
            rows="3"
            required
          />

          <input
            type="url"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 w-full"
            required
          />

          <div>
            <label className="text-gray-400 block mb-2">Price Options</label>
            {form.priceOptions.map((opt, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Type"
                  value={opt.type}
                  onChange={(e) =>
                    updatePriceOption(idx, "type", e.target.value)
                  }
                  className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-white/10 flex-1"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={opt.price}
                  onChange={(e) =>
                    updatePriceOption(idx, "price", parseFloat(e.target.value))
                  }
                  className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-white/10 w-32"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={opt.stock}
                  onChange={(e) =>
                    updatePriceOption(idx, "stock", parseInt(e.target.value))
                  }
                  className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-white/10 w-28"
                  required
                />
                <button
                  type="button"
                  onClick={() => removePriceOption(idx)}
                  className="text-red-400 px-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPriceOption}
              className="text-blue-400 text-sm mt-1"
            >
              + Add Price Option
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
          >
            {loading
              ? "Saving..."
              : isEditing
                ? "Update Product"
                : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
