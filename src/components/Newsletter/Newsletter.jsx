import { useState } from "react";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <h3>Join Our Spice Club</h3>
        <p>
          Subscribe to get special offers, recipes, and spice tips delivered to
          your inbox
        </p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
        <p className="newsletter-note">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
