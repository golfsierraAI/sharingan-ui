import { Link } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import "./OurStory.css";

const OurStory = () => {
  const timeline = [
    {
      year: "1998",
      title: "The Beginning",
      description:
        "Founded in a small kitchen in Mumbai with a vision to share authentic Indian spices with the world. Our founder, Rajesh Kumar, started by sourcing spices from his family's farm.",
    },
    {
      year: "2005",
      title: "Sustainable Expansion",
      description:
        "Expanded partnerships with small farmers across India who shared our commitment to sustainable agriculture and quality practices.",
    },
    {
      year: "2010",
      title: "Fair Trade Certified",
      description:
        "Received Fair Trade certification, ensuring farmers receive fair prices and work in safe conditions. Expanded to work with 50+ farming cooperatives.",
    },
    {
      year: "2015",
      title: "National Expansion",
      description:
        "Opened distribution centers across the US to serve customers faster. Launched our online store to reach spice enthusiasts nationwide.",
    },
    {
      year: "2020",
      title: "Sustainability Pledge",
      description:
        "Committed to carbon-neutral operations by 2025. Introduced eco-friendly packaging and invested in renewable energy projects in farming communities.",
    },
    {
      year: "2025",
      title: "Today & Beyond",
      description:
        "Serving over 500,000 customers annually, working with 200+ farmers, and continuing our mission to bring authentic, sustainable spices to every kitchen.",
    },
  ];

  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description:
        "We're committed to protecting our planet through sustainable farming, eco-friendly packaging, and carbon-neutral operations.",
    },
    {
      icon: "🤝",
      title: "Fair Trade",
      description:
        "We pay farmers premium prices, ensure safe working conditions, and invest in community development projects.",
    },
    {
      icon: "✨",
      title: "Quality",
      description:
        "Every batch is lab-tested for purity and quality. We never compromise on the authenticity and freshness of our spices.",
    },
    {
      icon: "❤️",
      title: "Community",
      description:
        "We believe in building lasting relationships with farmers, customers, and the communities we serve around the world.",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/300?img=12",
      bio: "With over 25 years of experience in the spice industry, Rajesh leads our mission to bring authentic flavors worldwide.",
    },
    {
      name: "Priya Sharma",
      role: "Head of Sourcing",
      image: "https://i.pravatar.cc/300?img=5",
      bio: "Priya travels across India building relationships with farmers and ensuring the highest quality sourcing practices.",
    },
    {
      name: "Michael Chen",
      role: "Quality Assurance Director",
      image: "https://i.pravatar.cc/300?img=13",
      bio: "Michael oversees our rigorous testing protocols, ensuring every product meets our strict safety and quality standards.",
    },
    {
      name: "Sarah Johnson",
      role: "Sustainability Officer",
      image: "https://i.pravatar.cc/300?img=9",
      bio: "Sarah leads our environmental initiatives and ensures our operations maintain the highest sustainability standards.",
    },
  ];

  return (
    <div className="story-page">
      <AppHeader />

      <main className="story-main">
        {/* Hero Section */}
        <div className="story-hero">
          <div className="story-hero-content">
            <span className="story-badge">📖 Our Journey</span>
            <h1>From Farm to Family</h1>
            <p>
              A story of passion, tradition, and commitment to bringing
              authentic Indian spices to kitchens around the world
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="story-section mission-section">
          <div className="story-container">
            <div className="mission-content">
              <div className="mission-text">
                <h2>Our Mission</h2>
                <p className="large-text">
                  To preserve and share the authentic flavors of India while
                  supporting sustainable farming practices and empowering local
                  communities.
                </p>
                <p>
                  We believe that great food starts with great ingredients.
                  That's why we work directly with farmers who have been
                  cultivating spices for generations, using traditional methods
                  passed down through families. Every spice we sell tells a
                  story of the land it came from and the hands that nurtured it.
                </p>
                <p>
                  Our commitment goes beyond just selling spices. We're
                  dedicated to creating a sustainable supply chain that benefits
                  everyone – from the farmers who grow the spices to the
                  families who cook with them.
                </p>
              </div>
              <div className="mission-image">
                <div className="image-placeholder">
                  <img
                    src="https://images.unsplash.com/photo-1596040033229-a0b8462edf14?w=600"
                    alt="Spice farm"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="story-section timeline-section">
          <div className="story-container">
            <h2 className="section-heading">Our Journey Through Time</h2>
            <div className="timeline">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">
                    <div className="timeline-dot"></div>
                    {index < timeline.length - 1 && (
                      <div className="timeline-line"></div>
                    )}
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="story-section values-section">
          <div className="story-container">
            <h2 className="section-heading">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="story-section team-section">
          <div className="story-container">
            <h2 className="section-heading">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind Spice Bazaar
            </p>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="story-section cta-section">
          <div className="story-container">
            <div className="cta-content">
              <h2>Join Us on Our Journey</h2>
              <p>
                Experience the difference that authentic, sustainably-sourced
                spices can make in your cooking.
              </p>
              <div className="cta-buttons">
                <Link to="/products" className="btn btn-primary">
                  Shop Our Spices
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Get in Touch
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

export default OurStory;
