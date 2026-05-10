// ProductsTable - products list aur actions
const ProductsTable = ({ products, loading, onAdd, onEdit, onDelete }) => {
  // Loading state check
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with title aur add button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Products Management</h1>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
        >
          + Add New Product
        </button>
      </div>

      {/* Products table */}
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-white/10">
            <tr>
              <th className="p-3 text-gray-400">Image</th>
              <th className="p-3 text-gray-400">Name</th>
              <th className="p-3 text-gray-400">Category</th>
              <th className="p-3 text-gray-400">Brand</th>
              <th className="p-3 text-gray-400">Price</th>
              <th className="p-3 text-gray-400">Stock</th>
              <th className="p-3 text-gray-400">Rating</th>
              <th className="p-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map products */}
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-white/5 hover:bg-slate-900/50 transition"
              >
                {/* Product image */}
                <td className="p-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                {/* Product name */}
                <td className="p-3 text-white max-w-xs truncate">
                  {product.name}
                </td>
                {/* Category badge */}
                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
                    {product.category}
                  </span>
                </td>
                {/* Brand */}
                <td className="p-3 text-gray-400">{product.brand}</td>
                {/* Price */}
                <td className="p-3 text-amber-400 font-medium">
                  ₨ {product.priceOptions?.[0]?.price?.toLocaleString()}
                </td>
                {/* Stock */}
                <td className="p-3 text-white">
                  {product.priceOptions?.[0]?.stock || 0}
                </td>
                {/* Rating */}
                <td className="p-3 text-yellow-400">{product.rating} ★</td>
                {/* Action buttons */}
                <td className="p-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-400 hover:text-blue-300 mr-3 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No products found. Click "Add New Product" to create one.
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
