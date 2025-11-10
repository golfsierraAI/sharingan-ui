import './Hero.css';

const Hero = ({
    title = "New Collection",
    subtitle = "Discover our latest arrivals",
    buttonText = "Shop Now",
    backgroundImage,
    onButtonClick
}) => {
    return (
        <section
            className="hero"
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
        >
            <div className="hero-decorative-circle hero-circle-1"></div>
            <div className="hero-decorative-circle hero-circle-2"></div>
            <div className="hero-decorative-circle hero-circle-3"></div>
            
            <div className="hero-content">
                <div className="hero-badge">
                    <span className="hero-badge-icon">✨</span>
                    <span>Premium Quality</span>
                </div>
                <h1 className="hero-title">
                    {title}
                </h1>
                <p className="hero-subtitle">{subtitle}</p>
                <div className="hero-actions">
                    <button className="hero-btn hero-btn-primary" onClick={onButtonClick}>
                        {buttonText}
                        <span className="btn-arrow">→</span>
                    </button>
                    <button className="hero-btn hero-btn-secondary">
                        Learn More
                    </button>
                </div>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Products</span>
                    </div>
                    <div className="hero-stat-divider"></div>
                    <div className="hero-stat">
                        <span className="stat-number">10K+</span>
                        <span className="stat-label">Happy Customers</span>
                    </div>
                    <div className="hero-stat-divider"></div>
                    <div className="hero-stat">
                        <span className="stat-number">25+</span>
                        <span className="stat-label">Years Experience</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

