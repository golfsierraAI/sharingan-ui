import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import orderService from "../../services/orderService";
import "./Orders.css";

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="orders-container">
        <AppHeader />
        <main className="orders-main">
          <div className="orders-content">
            <div className="loading-state">
              <p>Loading your orders...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <AppHeader />
        <main className="orders-main">
          <div className="orders-content">
            <div className="error-state">
              <p>{error}</p>
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="orders-container">
      <AppHeader />

      <main className="orders-main">
        <div className="orders-content">
          <h1 className="orders-title">My Orders</h1>

          {orders.length === 0 ? (
            <div className="orders-empty-state">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              <h2>No orders yet</h2>
              <p>Start shopping to see your orders here!</p>
              <Button variant="primary" onClick={() => navigate("/products")}>
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3 className="order-number">Order #{order.id}</h3>
                      <p className="order-date">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                      {order.shippingStatus && (
                        <p className="order-status">
                          Status: <span>{order.shippingStatus}</span>
                        </p>
                      )}
                    </div>
                    <div className="order-total">
                      <span className="total-label">Total</span>
                      <span className="total-amount">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  {order.shippingAddress && (
                    <div className="order-shipping">
                      <h4>Shipping Address</h4>
                      <p>
                        {order.shippingAddress.street &&
                          `${order.shippingAddress.street}, `}
                        {order.shippingAddress.city &&
                          `${order.shippingAddress.city}, `}
                        {order.shippingAddress.state &&
                          `${order.shippingAddress.state} `}
                        {order.shippingAddress.zipCode &&
                          order.shippingAddress.zipCode}
                      </p>
                    </div>
                  )}

                  <div className="order-items">
                    <h4>Items</h4>
                    <div className="items-list">
                      {order.orderItems?.map((item) => (
                        <div key={item.id} className="order-item">
                          <div className="item-image">
                            {item.product?.url ? (
                              <img
                                src={item.product.url}
                                alt={item.product.name || "Product"}
                                width={60}
                                height={60}
                              />
                            ) : (
                              <svg
                                width="60"
                                height="60"
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
                          <div className="item-details">
                            <h5>{item.product?.name || "Product"}</h5>
                            <p className="item-quantity">
                              Quantity: {item.quantity}
                            </p>
                            <p className="item-price">
                              {formatPrice(item.unitPriceAtOrderTime)} each
                            </p>
                          </div>
                          <div className="item-total">
                            {formatPrice(item.totalAmount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
