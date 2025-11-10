import "./ProductCard.css";

const ProductCard = ({
  image,
  name = "Product Name",
  price = "99.00",
  category = "Spices",
  rating = 4.5,
  isNew = false,
  isBestSeller = false,
  onClick,
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#half-${i})`}
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="product-placeholder">
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
        {(isNew || isBestSeller) && (
          <div className="product-badge">
            {isBestSeller ? "Best Seller" : "New"}
          </div>
        )}
        <div className="product-overlay">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{category}</div>
        <h4 className="product-name">{name}</h4>
        <div className="product-footer">
          <div className="product-rating">
            {renderStars(rating)}
            <span className="rating-value">{rating}</span>
          </div>
          <p className="product-price">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
