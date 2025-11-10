import './TestimonialCard.css';

const TestimonialCard = ({ rating = 5, text, authorName, authorTitle }) => {
  const stars = '⭐'.repeat(rating);
  
  return (
    <div className="testimonial-card">
      <div className="stars">{stars}</div>
      <p className="testimonial-text">{text}</p>
      <div className="testimonial-author">
        <strong>{authorName}</strong>
        <span>{authorTitle}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;

