import './SectionTitle.css';

const SectionTitle = ({ children, subtitle, className = '' }) => {
  return (
    <div className={`section-title-wrapper ${className}`}>
      <h2 className="section-title">{children}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;

