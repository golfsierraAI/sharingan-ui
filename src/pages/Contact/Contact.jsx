import { useState } from "react";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const faqs = [
    {
      question: "What are your shipping times?",
      answer: "Standard shipping takes 3-5 business days within the US.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes! We ship to most countries worldwide. International delivery typically takes 7-14 business days.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day satisfaction guarantee on all unopened products.",
    },
    {
      question: "Are your spices organic?",
      answer: "Yes, all our spices are 100% USDA certified organic.",
    },
  ];

  return (
    <div className="contact-page">
      <AppHeader />

      <main className="contact-main">
        {/* Hero Section */}
        <div className="contact-hero">
          <div className="contact-hero-content">
            <span className="contact-badge">💬 Get in Touch</span>
            <h1>We'd Love to Hear From You</h1>
            <p>
              Have questions? Need help? Our customer service team is here to
              assist you.
            </p>
          </div>
        </div>

        {/* Contact Form and Info */}
        <section className="contact-section form-section">
          <div className="contact-container">
            <div className="form-grid">
              {/* Form */}
              <div className="contact-form-wrapper">
                <h2>Send Us a Message</h2>
                <p className="form-intro">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>

                {submitted ? (
                  <div className="success-message">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle
                        cx="24"
                        cy="24"
                        r="22"
                        fill="#10b981"
                        opacity="0.2"
                      />
                      <path
                        d="M16 24L22 30L32 18"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3>Message Sent!</h3>
                    <p>
                      Thank you for contacting us. We'll get back to you
                      shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <Input
                      label="Your Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />

                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="shipping">Shipping & Delivery</option>
                        <option value="return">Returns & Refunds</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Tell us how we can help..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-submit"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* FAQ Sidebar */}
              <div className="contact-sidebar">
                <div className="faq-quick">
                  <h3>Quick Answers</h3>
                  <p>Find answers to common questions</p>
                  <div className="faq-list">
                    {faqs.map((faq, index) => (
                      <div key={index} className="faq-item-small">
                        <h4>{faq.question}</h4>
                        <p>{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  <a href="/faq" className="btn btn-outline btn-full">
                    View All FAQs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
