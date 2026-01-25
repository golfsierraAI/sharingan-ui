import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
// This only loads once and is cached
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

/**
 * StripeProvider - Wraps components that need access to Stripe
 * Following Stripe best practices:
 * - Loads Stripe.js asynchronously
 * - Uses environment variables for keys
 * - Provides Elements context to children
 */
const StripeProvider = ({ children, options = {} }) => {
  // Default appearance styling for Stripe Elements
  // Use brand color for text
  const brandColor = typeof window !== 'undefined' 
    ? getComputedStyle(document.documentElement).getPropertyValue('--color-brand').trim() || "#14452F"
    : "#14452F";
  
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0570de", // Stripe's default blue
      colorBackground: "#ffffff",
      colorText: brandColor,
      colorDanger: "#df1b41",
      fontFamily: "system-ui, -apple-system, sans-serif",
      spacingUnit: "4px",
      borderRadius: "8px",
    },
  };

  // Build options based on whether clientSecret is provided
  const elementsOptions = {
    ...options,
    appearance: {
      ...appearance,
      ...options.appearance,
    },
  };

  // If clientSecret is provided, don't include mode/amount/currency
  // If not provided, use mode for setup
  if (!options.clientSecret) {
    elementsOptions.mode = "payment";
    elementsOptions.amount = options.amount || 1000;
    elementsOptions.currency = options.currency || "usd";
  }

  return (
    <Elements stripe={stripePromise} options={elementsOptions}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
