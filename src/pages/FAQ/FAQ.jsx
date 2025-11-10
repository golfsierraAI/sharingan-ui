import { useState } from "react";
import { Link } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping typically takes 3-5 business days within the continental US. We also offer expedited 2-day and overnight shipping options at checkout. International orders usually arrive within 7-14 business days depending on the destination.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes! We offer free standard shipping on all orders over $50 within the US. For orders under $50, a flat shipping rate of $5.99 applies. Free shipping promotions may vary for international orders.",
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and visiting the 'Order History' section. If you checked out as a guest, use the tracking link in your shipping confirmation email.",
        },
        {
          question: "Can I change or cancel my order?",
          answer:
            "Orders can be modified or canceled within 1 hour of placement. After that, our warehouse begins processing and we cannot make changes. Please contact our customer service team immediately at support@spicebazaar.com if you need to modify an order.",
        },
      ],
    },
    {
      category: "Products & Quality",
      questions: [
        {
          question: "Are your spices organic?",
          answer:
            "Yes! All of our spices are 100% USDA certified organic. We source directly from certified organic farms in India and conduct third-party testing to ensure purity and quality. Each product comes with a certification number you can verify.",
        },
        {
          question: "How long do spices stay fresh?",
          answer:
            "Whole spices can maintain their potency for up to 3-4 years when stored properly. Ground spices are best used within 2-3 years. We recommend storing spices in a cool, dry place away from direct sunlight. Each package includes a 'packed on' date for your reference.",
        },
        {
          question: "Do you test for contaminants?",
          answer:
            "Absolutely. Every batch of spices undergoes rigorous third-party laboratory testing for contaminants, including heavy metals, pesticides, and aflatoxins. We maintain the highest safety standards and provide test certificates upon request.",
        },
        {
          question: "What's the difference between whole and ground spices?",
          answer:
            "Whole spices retain their flavor and aroma longer than ground spices. They're ideal for infusing flavors in cooking and can be ground fresh when needed. Ground spices offer convenience and are ready to use immediately. We recommend whole spices for the best flavor longevity.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return unopened products within 30 days for a full refund. For opened products with quality issues, please contact us within 7 days of receipt.",
        },
        {
          question: "How do I return a product?",
          answer:
            "Contact our customer service team at support@spicebazaar.com with your order number and reason for return. We'll provide you with a prepaid return label and instructions. Once we receive and inspect the return, refunds are processed within 5-7 business days.",
        },
        {
          question: "Do you offer exchanges?",
          answer:
            "Yes! If you'd like to exchange a product for a different variety or size, contact our customer service team. We'll arrange for the exchange and cover any shipping costs associated with our error or damaged products.",
        },
      ],
    },
    {
      category: "Account & Payment",
      questions: [
        {
          question: "Do I need an account to place an order?",
          answer:
            "No, you can checkout as a guest. However, creating an account allows you to track orders, save favorite products, access exclusive deals, and enjoy a faster checkout experience for future purchases.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secured with 256-bit SSL encryption for your protection.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Absolutely. We use industry-standard SSL encryption and PCI DSS compliance to protect your payment information. We never store your complete credit card information on our servers. All payment processing is handled by trusted, certified payment processors.",
        },
        {
          question: "Do you offer wholesale pricing?",
          answer:
            "Yes! We offer wholesale pricing for bulk orders and commercial customers. Please contact our wholesale team at wholesale@spicebazaar.com with your business information and order requirements for a custom quote.",
        },
      ],
    },
    {
      category: "Sustainability & Sourcing",
      questions: [
        {
          question: "Where do you source your spices from?",
          answer:
            "We work directly with small-scale farmers and cooperatives across India, including regions like Kerala, Tamil Nadu, Karnataka, and the Himalayan foothills. Each region is chosen for its ideal climate and traditional cultivation methods for specific spices.",
        },
        {
          question: "Are your packaging materials eco-friendly?",
          answer:
            "Yes! We use recyclable glass jars, biodegradable labels, and minimal plastic in our packaging. Our shipping materials are made from recycled cardboard and biodegradable packing peanuts. We're continuously working to reduce our environmental footprint.",
        },
        {
          question: "Do you support fair trade practices?",
          answer:
            "We're committed to fair trade principles. We pay farmers premium prices above market rates, ensure safe working conditions, and invest in community development projects in the regions where we source. While not all products carry official Fair Trade certification, we maintain these ethical standards across our supply chain.",
        },
      ],
    },
  ];

  return (
    <div className="faq-page">
      <AppHeader />

      <main className="faq-main">
        {/* Hero Section */}
        <div className="faq-hero">
          <div className="faq-hero-content">
            <span className="faq-badge">❓ Help Center</span>
            <h1>Frequently Asked Questions</h1>
            <p>
              Find answers to common questions about our products, shipping,
              returns, and more
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="faq-content">
          <div className="faq-container">
            {/* FAQ List */}
            <div className="faq-list">
              {faqs.map((category, categoryIndex) => (
                <section
                  key={categoryIndex}
                  id={category.category.replace(/\s+/g, "-")}
                  className="faq-category"
                >
                  <h2 className="category-title">{category.category}</h2>
                  <div className="faq-items">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = `${categoryIndex}-${faqIndex}`;
                      const isOpen = openIndex === globalIndex;

                      return (
                        <div
                          key={faqIndex}
                          className={`faq-item ${isOpen ? "open" : ""}`}
                        >
                          <button
                            className="faq-question"
                            onClick={() => toggleFAQ(globalIndex)}
                          >
                            <span>{faq.question}</span>
                            <svg
                              className={`faq-icon ${isOpen ? "rotate" : ""}`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}

              {/* Contact Card at Bottom */}
              <div className="faq-contact-card-bottom">
                <h3>Still have questions?</h3>
                <p>Our customer service team is here to help!</p>
                <div className="contact-info">
                  <div className="contact-item">
                    <span>📞</span>
                    <span>1-800-SPICE-01</span>
                  </div>
                  <div className="contact-item">
                    <span>✉️</span>
                    <span>support@spicebazaar.com</span>
                  </div>
                  <div className="contact-item">
                    <span>🕒</span>
                    <span>Mon-Fri: 9AM - 6PM EST</span>
                  </div>
                </div>
                <Link to="/contact" className="btn btn-primary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
