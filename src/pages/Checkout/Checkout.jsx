import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  createPaymentIntent,
  confirmOrder,
} from "../../services/paymentService";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import StripeProvider from "../../components/StripeProvider";
import StripeCheckoutForm from "../../components/StripeCheckoutForm";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  const totalInCents = Math.round(total * 100); // Stripe uses cents

  const [clientSecret, setClientSecret] = useState(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isReadyToPay, setIsReadyToPay] = useState(false);
  const [isProcessingSuccess, setIsProcessingSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if cart is empty (but not if we're processing a successful payment)
  useEffect(() => {
    if (cartItems.length === 0 && !isProcessingSuccess) {
      navigate("/cart");
    }
  }, [cartItems, navigate, isProcessingSuccess]);

  // Scroll to top when transitioning to payment step
  useEffect(() => {
    if (isReadyToPay) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isReadyToPay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";

    return newErrors;
  };

  const handleContinueToPayment = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoadingPayment(true);
      setPaymentError(null);

      try {
        // Create payment intent on server
        // Server returns clientSecret which is safe to use on client
        const secret = await createPaymentIntent(totalInCents, {
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          // Stringify items for Stripe metadata (Stripe only accepts strings)
          itemsJson: JSON.stringify(
            cartItems.map((item) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            }))
          ),
          itemCount: cartItems.length.toString(),
          orderTotal: total.toFixed(2),
        });

        setClientSecret(secret);
        setIsReadyToPay(true);
      } catch (error) {
        setPaymentError(error.message);
      } finally {
        setIsLoadingPayment(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Set flag to prevent cart empty redirect
      setIsProcessingSuccess(true);

      // Confirm order on server after successful payment
      await confirmOrder(paymentIntent.id, {
        shipping: formData,
        items: cartItems,
        total: total,
        subtotal: subtotal,
        shippingCost: shipping,
      });

      // Clear cart and redirect to success page
      clearCart();
      navigate("/checkout/success", {
        state: {
          orderNumber: paymentIntent.id.substring(0, 8).toUpperCase(),
          email: formData.email,
        },
      });
    } catch (error) {
      console.error("Error confirming order:", error);
      setPaymentError(
        "Payment succeeded but order confirmation failed. Please contact support."
      );
      setIsProcessingSuccess(false);
    }
  };

  const handlePaymentError = (error) => {
    setPaymentError(error.message || "Payment failed. Please try again.");
    // Could also log to error tracking service here
  };

  const handleEditDetails = () => {
    setIsReadyToPay(false);
    setClientSecret(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="checkout-container">
      <AppHeader />

      <main className="checkout-main">
        <div className="checkout-content">
          <h1 className="checkout-title">Checkout</h1>

          {paymentError && (
            <div className="checkout-error-banner" role="alert">
              <strong>Error:</strong> {paymentError}
            </div>
          )}

          <div className="checkout-layout">
            <div className="checkout-form-section">
              {!isReadyToPay ? (
                <form onSubmit={handleContinueToPayment}>
                  <Card>
                    <h2 className="section-heading">Contact Information</h2>
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      error={errors.email}
                    />
                  </Card>

                  <Card>
                    <h2 className="section-heading">Shipping Address</h2>
                    <div className="form-row">
                      <Input
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        error={errors.firstName}
                      />
                      <Input
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        error={errors.lastName}
                      />
                    </div>
                    <Input
                      label="Address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main St"
                      required
                      error={errors.address}
                    />
                    <div className="form-row">
                      <Input
                        label="City"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        error={errors.city}
                      />
                      <Input
                        label="State"
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="CA"
                        required
                        error={errors.state}
                      />
                      <Input
                        label="ZIP Code"
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="12345"
                        required
                        error={errors.zipCode}
                      />
                    </div>
                  </Card>

                  <div className="checkout-actions">
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      disabled={isLoadingPayment}
                    >
                      {isLoadingPayment ? "Loading..." : "Continue to Payment"}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      fullWidth
                      onClick={() => navigate("/cart")}
                    >
                      Return to Cart
                    </Button>
                  </div>
                </form>
              ) : (
                <Card>
                  <div className="checkout-payment-section">
                    <div className="section-heading-row">
                      <h2 className="section-heading">Payment Information</h2>
                      <button
                        type="button"
                        className="edit-button"
                        onClick={handleEditDetails}
                      >
                        Edit Details
                      </button>
                    </div>

                    <div className="shipping-summary">
                      <p>
                        <strong>Shipping to:</strong>
                      </p>
                      <p>
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p>{formData.address}</p>
                      <p>
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                      <p>{formData.email}</p>
                    </div>

                    {/* Stripe Elements Provider with clientSecret */}
                    {clientSecret && (
                      <StripeProvider
                        options={{
                          clientSecret,
                        }}
                      >
                        <StripeCheckoutForm
                          amount={totalInCents}
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                        />
                      </StripeProvider>
                    )}
                  </div>
                </Card>
              )}
            </div>

            <div className="checkout-summary">
              <Card>
                <h2 className="section-heading">Order Summary</h2>

                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <div className="summary-item-info">
                        <span className="summary-item-name">{item.name}</span>
                        <span className="summary-item-qty">
                          × {item.quantity}
                        </span>
                      </div>
                      <span className="summary-item-price">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="summary-divider"></div>

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

                <div className="summary-divider"></div>

                <div className="summary-row summary-total">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </Card>

              {/* Trust badges */}
              <div className="trust-badges">
                <div className="trust-badge">
                  <span>🔒</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="trust-badge">
                  <span>↩️</span>
                  <span>Easy Returns</span>
                </div>
                <div className="trust-badge">
                  <span>📦</span>
                  <span>Free Shipping $50+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
