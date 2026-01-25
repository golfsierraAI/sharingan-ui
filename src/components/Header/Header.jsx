import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartDropdown from "../CartDropdown";
import AccountDropdown from "../AccountDropdown";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const cartCount = getCartCount();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsAccountOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
    setIsCartOpen(false);
  };

  const closeAccount = () => {
    setIsAccountOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            SPICE BAZAAR
          </h1>
          <nav className="nav">
            <Link to="/products">Shop Spices</Link>
            <Link to="/about">Our Story</Link>
            <a href="#">Recipes</a>
          </nav>
          <div className="header-actions">
            <div className="account-wrapper">
              <button
                className="icon-btn"
                aria-label="Account"
                onClick={toggleAccount}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              <AccountDropdown isOpen={isAccountOpen} onClose={closeAccount} />
            </div>
            <button
              className="icon-btn cart-btn"
              aria-label="Shopping Cart"
              onClick={toggleCart}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <CartDropdown isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Header;
