import './Marquee.css';

const Marquee = () => {
    const messages = [
        "🌶️ Free Shipping on Orders Over $50",
        "✨ Fresh Spices, Sourced Directly from Farms",
        "🎉 New Arrivals: Exotic Spice Blends",
        "💚 100% Organic & Natural"
    ];

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {messages.map((message, index) => (
                    <span key={index} className="marquee-item">
                        {message}
                    </span>
                ))}
                {/* Duplicate for seamless loop */}
                {messages.map((message, index) => (
                    <span key={`duplicate-${index}`} className="marquee-item">
                        {message}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;

