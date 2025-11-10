import { Link } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import "./Sustainability.css";

const Sustainability = () => {
  const initiatives = [
    {
      icon: "🌍",
      title: "Carbon Neutral Operations",
      description:
        "We're on track to achieve 100% carbon-neutral operations by 2025 through renewable energy investments and carbon offset programs.",
      stats: [
        "85% carbon reduction",
        "Solar-powered facilities",
        "Green logistics",
      ],
    },
    {
      icon: "♻️",
      title: "Circular Packaging",
      description:
        "All our packaging materials are either recyclable, compostable, or reusable. We've eliminated single-use plastics across our operations.",
      stats: [
        "100% recyclable",
        "Zero plastic waste",
        "Biodegradable materials",
      ],
    },
    {
      icon: "💧",
      title: "Water Conservation",
      description:
        "Working with farmers to implement water-efficient irrigation systems and rainwater harvesting techniques to preserve this precious resource.",
      stats: ["40% water savings", "Drip irrigation", "Rainwater systems"],
    },
    {
      icon: "🌱",
      title: "Regenerative Agriculture",
      description:
        "Supporting farming practices that restore soil health, increase biodiversity, and sequester carbon from the atmosphere.",
      stats: ["200+ farms", "Soil restoration", "Biodiversity focus"],
    },
  ];

  const commitments = [
    {
      title: "2023",
      items: [
        "Achieved 100% renewable energy in our US facilities",
        "Launched our reusable container program",
        "Planted 50,000 trees in farming communities",
      ],
    },
    {
      title: "2024",
      items: [
        "Transitioned to electric delivery vehicles in major cities",
        "Reduced packaging materials by 40%",
        "Invested in solar panels for partner farms",
      ],
    },
    {
      title: "2025 Goals",
      items: [
        "Achieve complete carbon neutrality",
        "100% compostable packaging for all products",
        "Support 50 new farms in transitioning to organic",
      ],
    },
    {
      title: "2030 Vision",
      items: [
        "Climate-positive operations across all facilities",
        "Zero waste to landfill certification",
        "Restore 10,000 acres of degraded farmland",
      ],
    },
  ];

  const certifications = [
    {
      name: "USDA Organic",
      description: "All our spices are certified organic by the USDA",
    },
    {
      name: "Fair Trade",
      description: "Committed to fair prices and ethical labor practices",
    },
    {
      name: "Carbon Trust",
      description: "Certified for our carbon reduction initiatives",
    },
    {
      name: "B Corporation",
      description:
        "Meeting the highest standards of social and environmental performance",
    },
    {
      name: "Rainforest Alliance",
      description: "Supporting sustainable agriculture and forest conservation",
    },
    {
      name: "Non-GMO Project",
      description: "Verified non-GMO ingredients in all our products",
    },
  ];

  return (
    <div className="sustainability-page">
      <AppHeader />

      <main className="sustainability-main">
        {/* Hero Section */}
        <div className="sustainability-hero">
          <div className="sustainability-hero-content">
            <span className="sustainability-badge">🌿 Sustainability</span>
            <h1>Committed to Our Planet</h1>
            <p>
              Building a sustainable future through ethical practices,
              environmental stewardship, and community investment
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <section className="sustainability-section intro-section">
          <div className="sustainability-container">
            <div className="intro-content">
              <h2>Our Sustainability Promise</h2>
              <p className="large-text">
                We believe that the future of food depends on the health of our
                planet and the wellbeing of farming communities.
              </p>
              <p>
                That's why sustainability isn't just a buzzword for us—it's
                woven into every decision we make. From the farms where our
                spices are grown to the packaging that protects them, we're
                committed to minimizing our environmental impact while
                maximizing positive change.
              </p>
              <p>
                Our goal is simple: to leave the planet better than we found it,
                support thriving farming communities, and provide you with the
                highest quality, most sustainable spices available.
              </p>
            </div>
          </div>
        </section>

        {/* Initiatives Grid */}
        <section className="sustainability-section initiatives-section">
          <div className="sustainability-container">
            <h2 className="section-heading">Our Key Initiatives</h2>
            <div className="initiatives-grid">
              {initiatives.map((initiative, index) => (
                <div key={index} className="initiative-card">
                  <div className="initiative-icon">{initiative.icon}</div>
                  <h3>{initiative.title}</h3>
                  <p>{initiative.description}</p>
                  <ul className="initiative-stats">
                    {initiative.stats.map((stat, i) => (
                      <li key={i}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M13.5 4L6 11.5L2.5 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {stat}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline/Commitments */}
        <section className="sustainability-section commitments-section">
          <div className="sustainability-container">
            <h2 className="section-heading">Our Journey to Sustainability</h2>
            <p className="section-subtitle">
              Tracking our progress and future commitments
            </p>
            <div className="commitments-grid">
              {commitments.map((commitment, index) => (
                <div key={index} className="commitment-card">
                  <h3 className="commitment-year">{commitment.title}</h3>
                  <ul className="commitment-list">
                    {commitment.items.map((item, i) => (
                      <li key={i}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="8"
                            fill="currentColor"
                            opacity="0.2"
                          />
                          <path
                            d="M6 10L9 13L14 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="sustainability-section stats-section">
          <div className="sustainability-container">
            <h2 className="section-heading">Our Impact by Numbers</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">500K+</div>
                <div className="stat-label">Customers Served</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">200+</div>
                <div className="stat-label">Partner Farms</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">85%</div>
                <div className="stat-label">Carbon Reduction</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100K+</div>
                <div className="stat-label">Trees Planted</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">40%</div>
                <div className="stat-label">Water Saved</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0%</div>
                <div className="stat-label">Plastic Waste</div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="sustainability-section certifications-section">
          <div className="sustainability-container">
            <h2 className="section-heading">Our Certifications</h2>
            <p className="section-subtitle">
              Verified by independent organizations for our commitment to
              quality and sustainability
            </p>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="certification-badge">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M10 16L14 20L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3>{cert.name}</h3>
                  <p>{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="sustainability-section cta-section">
          <div className="sustainability-container">
            <div className="cta-content">
              <h2>Join Us in Making a Difference</h2>
              <p>
                Every purchase you make supports sustainable farming practices
                and helps us build a better future for our planet.
              </p>
              <div className="cta-buttons">
                <Link to="/products" className="btn btn-primary">
                  Shop Sustainable Spices
                </Link>
                <Link to="/sourcing" className="btn btn-outline">
                  Learn About Our Sourcing
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

export default Sustainability;
