import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import CartDropdown from "../CartDropdown";
import AccountDropdown from "../AccountDropdown";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
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
            <button
              className="icon-btn theme-toggle"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
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
