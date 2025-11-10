import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import "./CheckoutSuccess.css";

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, email } = location.state || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!orderNumber) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [orderNumber, navigate]);

  return (
    <div className="checkout-success-container">
      <AppHeader />

      <main className="checkout-success-main">
        <div className="checkout-success-content">
          <div className="success-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l2.5 2.5L16 9" />
            </svg>
          </div>

          <h1 className="success-title">Payment Successful!</h1>
          <p className="success-subtitle">
            Thank you for your order. Your payment has been processed
            successfully.
          </p>

          {orderNumber && (
            <div className="order-details">
              <div className="order-info-card">
                <h2>Order Details</h2>
                <div className="order-info-row">
                  <span className="order-label">Order Number:</span>
                  <span className="order-value">#{orderNumber}</span>
                </div>
                {email && (
                  <div className="order-info-row">
                    <span className="order-label">Confirmation Email:</span>
                    <span className="order-value">{email}</span>
                  </div>
                )}
              </div>

              <div className="success-message">
                <p>
                  <strong>What's next?</strong>
                </p>
                <ul>
                  <li>You'll receive a confirmation email shortly</li>
                  <li>Your order will be processed within 1-2 business days</li>
                  <li>You'll receive tracking information via email</li>
                </ul>
              </div>
            </div>
          )}

          <div className="success-actions">
            <Button variant="primary" onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>

          <div className="support-info">
            <p>
              Need help? <a href="/contact">Contact our support team</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
