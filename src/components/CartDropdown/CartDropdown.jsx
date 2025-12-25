import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Button from "../Button";
import "./CartDropdown.css";

const CartDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, removeFromCart } = useCart();

  const totalAmount = getCartTotal().toFixed(2);

  const handleClose = () => {
    if (cartItems.length === 0 && window.location.pathname === "/checkout") {
      navigate("/");
    } else {
      onClose();
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  console.log(cartItems);
  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-dropdown">
        <div className="cart-dropdown-header">
          <h3>Shopping Cart</h3>
          <button className="cart-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Button variant="primary" onClick={handleClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
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
                        width="40"
                        height="40"
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
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="cart-item-total">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-dropdown-footer">
              <div className="cart-total">
                <span>Subtotal:</span>
                <strong>${totalAmount}</strong>
              </div>
              <Button variant="primary" fullWidth onClick={handleCheckout}>
                Checkout
              </Button>
              <Button variant="secondary" fullWidth onClick={handleViewCart}>
                View Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDropdown;
