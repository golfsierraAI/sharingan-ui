import { useRef } from "react";
import "./Carousel.css";

const Carousel = ({ children, itemsPerView = 4 }) => {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      const targetScroll =
        carouselRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const childrenArray = Array.isArray(children) ? children : [children];
  const showButtons = childrenArray.length > itemsPerView;

  return (
    <div className="carousel-wrapper">
      {showButtons && (
        <button
          className="carousel-btn carousel-btn-left"
          onClick={() => scrollCarousel("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}
      <div className="carousel" ref={carouselRef}>
        {children}
      </div>
      {showButtons && (
        <button
          className="carousel-btn carousel-btn-right"
          onClick={() => scrollCarousel("right")}
          aria-label="Scroll right"
        >
          ›
        </button>
      )}
    </div>
  );
};

export default Carousel;
