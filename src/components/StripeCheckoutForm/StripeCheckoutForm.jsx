import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../Button";
import "./StripeCheckoutForm.css";

/**
 * StripeCheckoutForm - Secure payment form using Stripe Elements
 *
 * SECURITY BEST PRACTICES (from Stripe docs):
 * - Never handle raw card data directly
 * - Use PaymentElement for PCI-compliant card input
 * - Confirm payment on client, process on server
 * - Handle errors gracefully
 */
const StripeCheckoutForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stripe.js hasn't loaded yet
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Confirm the payment with Stripe
      // This securely collects payment info and sends it to Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required", // Only redirect if needed (e.g., 3D Secure)
      });

      if (error) {
        // Handle payment errors
        // Common errors: card declined, insufficient funds, etc.
        console.error("Payment error:", error);
        setErrorMessage(error.message);
        if (onError) {
          onError(error);
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment successful!
        console.log("Payment succeeded:", paymentIntent.id);
        if (onSuccess) {
          onSuccess(paymentIntent);
        }
      } else if (paymentIntent) {
        // Payment requires additional action or is processing
        console.log("Payment status:", paymentIntent.status);
        if (
          paymentIntent.status === "requires_action" ||
          paymentIntent.status === "requires_source_action"
        ) {
          setErrorMessage("Payment requires authentication. Please try again.");
        } else if (paymentIntent.status === "processing") {
          setErrorMessage(
            "Payment is processing. Please wait a moment and check your order status."
          );
        } else {
          setErrorMessage(
            `Payment status: ${paymentIntent.status}. Please contact support.`
          );
        }
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Payment error:", err);
      if (onError) {
        onError(err);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-checkout-form">
      {/* PaymentElement is Stripe's all-in-one payment UI component */}
      {/* It handles card input, validation, and formatting securely */}
      <div className="payment-element-container">
        <PaymentElement
          options={{
            layout: {
              type: "tabs",
              defaultCollapsed: false,
            },
          }}
        />
      </div>

      {errorMessage && (
        <div className="stripe-error-message" role="alert">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </Button>

      {/* Security badge to build trust */}
      <div className="stripe-security-badge">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Secured by Stripe</span>
      </div>
    </form>
  );
};

export default StripeCheckoutForm;
