import "./FeatureCard.css";

const FeatureCard = ({ icon, title, description }) => {
  const isImageFile = /\.(svg|png|jpg|jpeg|gif|webp)$/i.test(icon);

  return (
    <div className="feature-card">
      <div className="feature-icon">
        {isImageFile ? (
          <img src={`/icons/${icon}`} alt={title} />
        ) : (
          <span className="feature-icon-emoji">{icon}</span>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
