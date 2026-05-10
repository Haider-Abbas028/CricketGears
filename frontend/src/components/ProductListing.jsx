import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

const ProductListing = ({ title, subtitle, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);

  // Debounced values
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedMinPrice, setDebouncedMinPrice] = useState("");
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState("");
  const [debouncedBrand, setDebouncedBrand] = useState("");

  // Timers
  const searchTimerRef = useRef(null);
  const priceTimerRef = useRef(null);
  const brandTimerRef = useRef(null);

  // Search debounce
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(searchTimerRef.current);
  }, [searchTerm]);

  // Price debounce
  useEffect(() => {
    if (priceTimerRef.current) clearTimeout(priceTimerRef.current);
    priceTimerRef.current = setTimeout(() => {
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 500);
    return () => clearTimeout(priceTimerRef.current);
  }, [minPrice, maxPrice]);

  // Brand debounce
  useEffect(() => {
    if (brandTimerRef.current) clearTimeout(brandTimerRef.current);
    brandTimerRef.current = setTimeout(() => {
      setDebouncedBrand(selectedBrand);
    }, 300);
    return () => clearTimeout(brandTimerRef.current);
  }, [selectedBrand]);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("category", category);
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (debouncedMinPrice) params.append("minPrice", debouncedMinPrice);
      if (debouncedMaxPrice) params.append("maxPrice", debouncedMaxPrice);
      if (debouncedBrand) params.append("brand", debouncedBrand);

      const res = await axios.get(`${API_BASE_URL}/api/products?${params}`);
      setProducts(res.data.products);

      const uniqueBrands = [...new Set(res.data.products.map((p) => p.brand))];
      setBrands(uniqueBrands);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    debouncedBrand,
    category,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrand("");
    setDebouncedSearch("");
    setDebouncedMinPrice("");
    setDebouncedMaxPrice("");
    setDebouncedBrand("");
  };

  if (loading && products.length === 0) {
    return (
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <div className="bg-slate-700 h-8 w-48 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="bg-slate-700 h-5 w-64 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-amber-400">{title}</h1>
          <p className="text-gray-400 mt-2">{subtitle}</p>
          <p className="text-sm text-gray-500 mt-1">
            {products.length} products found
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl border border-white/10 p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Min Price (₨)"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Max Price (₨)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500"
            />
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500"
            >
              <option value="">All Brands</option>
              {brands.map((brand, idx) => (
                <option key={idx} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || minPrice || maxPrice || selectedBrand) && (
            <div className="mt-4 text-center">
              <button
                onClick={clearFilters}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Clear All Filters ✕
              </button>
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No products found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
