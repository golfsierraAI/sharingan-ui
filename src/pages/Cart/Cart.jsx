import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = getCartTotal();

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <AppHeader />

      <main className="cart-main">
        <div className="cart-content">
          <h1 className="cart-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <h2>Your cart is empty</h2>
              <p>Add some delicious spices to get started!</p>
              <Button variant="primary" onClick={() => navigate("/")}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items-section">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <div className="cart-item-image">
                      {item.url ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          width={80}
                          height={80}
                        />
                      ) : (
                        <svg
                          width="80"
                          height="80"
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
                      )}
                    </div>

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p className="cart-item-weight">{item.weight}</p>
                      <p className="cart-item-price">${item.price}</p>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= 10}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-total">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {subtotal < 50 && (
                  <div className="shipping-notice">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-row summary-total">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>

                <Button variant="primary" fullWidth onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>

                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
