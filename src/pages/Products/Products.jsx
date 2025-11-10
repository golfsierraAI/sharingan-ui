import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import ProductListCard from "../../components/ProductListCard";
import productService from "../../services/productService";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Set category from navigation state
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      // Clear the state after using it to prevent it from persisting
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Get unique categories
  const categories = useMemo(() => {
    const allCategories = products
      .flatMap((product) => product.categories || [])
      .filter((cat) => cat);
    return ["All", ...Array.from(new Set(allCategories))];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) =>
        product.categories?.includes(selectedCategory)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      }
      return 0;
    });

    return sorted;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="products-page">
      <AppHeader />

      <main className="products-main">
        {/* Hero Section */}
        <div className="products-hero">
          <div className="products-hero-content">
            <h1>All Products</h1>
            <p>Explore our complete collection of premium spices</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="products-controls">
          <div className="products-search-bar">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 19L14.65 14.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="products-filters">
            <div className="filter-group">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price Low-High</option>
                <option value="price-high">Price High-Low</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <rect x="1" y="1" width="7" height="7" rx="1" />
                  <rect x="12" y="1" width="7" height="7" rx="1" />
                  <rect x="1" y="12" width="7" height="7" rx="1" />
                  <rect x="12" y="12" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <rect x="1" y="2" width="18" height="3" rx="1" />
                  <rect x="1" y="8" width="18" height="3" rx="1" />
                  <rect x="1" y="14" width="18" height="3" rx="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-pill ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="results-info">
            <p>
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="products-loading">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-container">
            <div className={`products-list-grid ${viewMode}`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="product-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductListCard
                    name={product.name}
                    price={product.price}
                    image={product.url}
                    category={product.categories?.[0]}
                    rating={4.5}
                    onClick={() => handleProductClick(product)}
                  />
                </div>
              ))}
            </div>

            {/* End of List Marker */}
            <div className="end-of-list">
              <div className="end-of-list-line"></div>
              <div className="end-of-list-text">
                <span>✨</span>
                You've explored all our premium spices
                <span>✨</span>
              </div>
              <div className="end-of-list-line"></div>
            </div>
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;
