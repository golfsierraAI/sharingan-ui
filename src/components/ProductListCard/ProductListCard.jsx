import "./ProductListCard.css";

const ProductListCard = ({
  name,
  price,
  image,
  category,
  rating = 4.5,
  onClick,
}) => {
  return (
    <div className="product-list-card" onClick={onClick}>
      <div className="product-list-card-image">
        <img src={image} alt={name} />
        <div className="product-list-card-badge">New</div>
      </div>
      <div className="product-list-card-content">
        {category && (
          <span className="product-list-card-category">{category}</span>
        )}
        <h3 className="product-list-card-title">{name}</h3>
        <div className="product-list-card-footer">
          <div className="product-list-card-rating">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0l2.163 4.382 4.837.703-3.5 3.411.826 4.816L8 11.18l-4.326 2.132.826-4.816-3.5-3.411 4.837-.703L8 0z" />
            </svg>
            <span>{rating}</span>
          </div>
          <div className="product-list-card-price">${price}</div>
        </div>
      </div>
      <button className="product-list-card-btn">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M6 1L2 5M2 5L6 9M2 5H12C13.0609 5 14.0783 5.42143 14.8284 6.17157C15.5786 6.92172 16 7.93913 16 9V19"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductListCard;
