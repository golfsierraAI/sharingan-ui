import "./CategoryCard.css";

const CategoryCard = ({ icon, title, onClick }) => {
  return (
    <div
      className="category-card"
      onClick={onClick}
      style={{ backgroundImage: `url(${icon})` }}
    >
      <h4>{title}</h4>
    </div>
  );
};

export default CategoryCard;
