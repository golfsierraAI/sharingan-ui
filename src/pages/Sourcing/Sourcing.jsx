import { Link } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import "./Sourcing.css";

const Sourcing = () => {
  const regions = [
    {
      name: "Kerala",
      location: "Southwest India",
      specialties: ["Black Pepper", "Cardamom", "Ginger", "Turmeric"],
      description:
        "Known as the 'Spice Garden of India', Kerala's tropical climate and rich soil produce some of the world's finest spices.",
      farmers: 45,
      image:
        "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600",
    },
    {
      name: "Tamil Nadu",
      location: "Southeast India",
      specialties: ["Cardamom", "Cinnamon", "Cloves", "Nutmeg"],
      description:
        "The Western Ghats region provides ideal elevation and climate for premium cardamom and other aromatic spices.",
      farmers: 38,
      image:
        "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600",
    },
    {
      name: "Karnataka",
      location: "Southwest India",
      specialties: ["Coffee", "Pepper", "Cardamom", "Vanilla"],
      description:
        "Highland regions with perfect conditions for growing premium spices alongside famous coffee plantations.",
      farmers: 52,
      image:
        "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600",
    },
    {
      name: "Rajasthan",
      location: "Northwest India",
      specialties: ["Cumin", "Coriander", "Fenugreek", "Mustard"],
      description:
        "Arid climate perfect for producing intensely flavored seeds and spices used in traditional Indian cuisine.",
      farmers: 31,
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Farm Selection",
      description:
        "We carefully select farms based on their sustainable practices and commitment to quality. Each farm is personally visited and evaluated.",
    },
    {
      step: "02",
      title: "Growing & Harvesting",
      description:
        "Farmers use traditional methods passed down through generations. Spices are harvested at peak ripeness to ensure maximum flavor and potency.",
    },
    {
      step: "03",
      title: "Quality Testing",
      description:
        "Every batch undergoes rigorous testing for purity, potency, and safety. We test for contaminants, moisture content, and aromatic compounds.",
    },
    {
      step: "04",
      title: "Processing & Packaging",
      description:
        "Spices are processed in small batches to preserve freshness. Packaging is done in climate-controlled facilities using eco-friendly materials.",
    },
    {
      step: "05",
      title: "Direct Shipment",
      description:
        "We ship directly from our facilities to your door, minimizing handling and ensuring the freshest possible product reaches you.",
    },
  ];

  const principles = [
    {
      title: "Direct Relationships",
      description:
        "We work directly with farmers, eliminating middlemen and ensuring fair prices reach those who grow our spices.",
      icon: "🤝",
    },
    {
      title: "Sustainable Practices",
      description:
        "100% of our partner farms follow sustainable farming practices, prioritizing environmental health and quality.",
      icon: "🌱",
    },
    {
      title: "Fair Pricing",
      description:
        "We pay premium prices well above market rates, ensuring farmers can invest in their land and communities.",
      icon: "💰",
    },
    {
      title: "Long-term Partnerships",
      description:
        "We build lasting relationships with farmers, providing stable income and supporting multi-generational farms.",
      icon: "🌟",
    },
    {
      title: "Community Investment",
      description:
        "A portion of every sale funds education, healthcare, and infrastructure projects in farming communities.",
      icon: "🏫",
    },
    {
      title: "Traceability",
      description:
        "Every product can be traced back to the specific farm and harvest date, ensuring complete transparency.",
      icon: "📍",
    },
  ];

  return (
    <div className="sourcing-page">
      <AppHeader />

      <main className="sourcing-main">
        {/* Hero Section */}
        <div className="sourcing-hero">
          <div className="sourcing-hero-content">
            <span className="sourcing-badge">🌏 Sourcing Practices</span>
            <h1>From Our Farms to Your Table</h1>
            <p>
              Discover how we source the world's finest spices through direct
              relationships, ethical practices, and unwavering commitment to
              quality
            </p>
          </div>
        </div>

        {/* Introduction */}
        <section className="sourcing-section intro-section">
          <div className="sourcing-container">
            <div className="intro-content">
              <h2>Ethical Sourcing, Exceptional Quality</h2>
              <p className="large-text">
                We believe great spices start with great relationships.
              </p>
              <p>
                That's why we travel directly to source regions, building
                personal relationships with farmers who share our commitment to
                quality, sustainability, and ethical practices. By eliminating
                middlemen, we ensure fair prices reach the farmers while
                bringing you the freshest, most flavorful spices possible.
              </p>
              <p>
                Every spice in our collection is carefully selected from farms
                we know and trust. We visit these farms regularly, understanding
                their unique growing conditions, traditional methods, and the
                people who pour their expertise into every harvest.
              </p>
            </div>
          </div>
        </section>

        {/* Regions */}
        <section className="sourcing-section regions-section">
          <div className="sourcing-container">
            <h2 className="section-heading">Our Source Regions</h2>
            <p className="section-subtitle">
              Partnering with farmers across India's most renowned spice-growing
              regions
            </p>
            <div className="regions-grid">
              {regions.map((region, index) => (
                <div key={index} className="region-card">
                  <div className="region-image">
                    <img src={region.image} alt={region.name} />
                    <div className="region-badge">{region.farmers} Farmers</div>
                  </div>
                  <div className="region-content">
                    <div className="region-header">
                      <h3>{region.name}</h3>
                      <span className="region-location">{region.location}</span>
                    </div>
                    <p>{region.description}</p>
                    <div className="region-specialties">
                      <strong>Specialties:</strong>
                      <div className="specialty-tags">
                        {region.specialties.map((specialty, i) => (
                          <span key={i} className="specialty-tag">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="sourcing-section process-section">
          <div className="sourcing-container">
            <h2 className="section-heading">Our Sourcing Process</h2>
            <p className="section-subtitle">
              From farm to package, every step is designed to ensure quality and
              freshness
            </p>
            <div className="process-timeline">
              {process.map((item, index) => (
                <div key={index} className="process-item">
                  <div className="process-step">{item.step}</div>
                  <div className="process-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="sourcing-section principles-section">
          <div className="sourcing-container">
            <h2 className="section-heading">Our Sourcing Principles</h2>
            <div className="principles-grid">
              {principles.map((principle, index) => (
                <div key={index} className="principle-card">
                  <div className="principle-icon">{principle.icon}</div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="sourcing-section cta-section">
          <div className="sourcing-container">
            <div className="cta-content">
              <h2>Experience the Difference</h2>
              <p>
                Taste the quality that comes from ethical sourcing and direct
                farmer relationships.
              </p>
              <div className="cta-buttons">
                <Link to="/products" className="btn btn-primary">
                  Shop Our Collection
                </Link>
                <Link to="/sustainability" className="btn btn-outline">
                  Our Sustainability Commitment
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sourcing;
