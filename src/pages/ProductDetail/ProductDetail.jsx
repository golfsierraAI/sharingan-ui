import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import CongratsModal from "../../components/CongratsModal";
import "./ProductDetail.css";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = location.state.product;

  console.log(product);

  if (!product) {
    return (
      <div className="product-detail-container">
        <AppHeader />
        <div className="product-not-found">
          <h2>Product not found</h2>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
    };
    addToCart(cartProduct, quantity);
    setShowCongrats(true);
    setQuantity(1);
    setTimeout(() => {
      setShowCongrats(false);
    }, 3000);
  };

  return (
    <div className="product-detail-container">
      <AppHeader />

      <main className="product-detail-main">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail-content">
          <div className="product-image-section">
            <div className="product-detail-image">
              {product.url ? (
                <img
                  src={product.url}
                  alt={product.name}
                  width={"100%"}
                  height={"100%"}
                />
              ) : (
                <div className="product-detail-placeholder">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Weight:</span>
                <span className="meta-value">{product.weight}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Origin:</span>
                <span className="meta-value">{product.origin}</span>
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            {/* <div className="product-features">
                            <h3>Key Features:</h3>
                            <ul>
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div> */}

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-actions">
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="secondary" onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <CongratsModal
        isOpen={showCongrats}
        onClose={() => setShowCongrats(false)}
        productName={product.name}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductDetail;
