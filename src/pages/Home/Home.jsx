import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import AppHeader from "../../components/AppHeader";
import Hero from "../../components/Hero";
import ProductCard from "../../components/ProductCard";
import FeatureCard from "../../components/FeatureCard";
import CategoryCard from "../../components/CategoryCard";
import TestimonialCard from "../../components/TestimonialCard";
import SectionTitle from "../../components/SectionTitle";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import Carousel from "../../components/Carousel";
import "./Home.css";
import productService from "../../services/productService";

const getSpiceProducts = async () => {
  const products = await productService.getProducts();
  return products;
};

const Home = () => {
  const [spiceProducts, setSpiceProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const parallaxRef = useRef(null);

  useEffect(() => {
    getSpiceProducts().then((products) => {
      setCategories(
        Array.from(
          new Set(products.map((product) => product.categories).flat())
        )
      );
      setSpiceProducts(products);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const section = parallaxRef.current.closest(".parallax-section");
        if (section) {
          const rect = section.getBoundingClientRect();
          const scrolled = window.pageYOffset;
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const windowHeight = window.innerHeight;

          // Calculate parallax only when section is in view
          if (rect.top < windowHeight && rect.bottom > 0) {
            const speed = 0.3;
            const yPos = (scrolled - sectionTop) * speed;
            parallaxRef.current.style.transform = `translateY(${yPos}px)`;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(categories);

  const navigate = useNavigate();

  const handleShopNow = () => {
    document.querySelector(".products-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleCategoryClick = (category) => {
    navigate("/products", { state: { selectedCategory: category } });
  };

  return (
    <div className="home-container">
      <AppHeader />

      <main className="main-content">
        <Hero
          title="Premium Indian Spices"
          subtitle="Authentic flavors, sourced directly from farms"
          buttonText="Explore Spices"
          onButtonClick={handleShopNow}
        />

        {/* Parallax Decorative Section */}
        <section className="parallax-section">
          <div className="parallax-bg" ref={parallaxRef}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="parallaxGradient1"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#14452f" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#14452f" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#14452f" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient
                  id="parallaxGradient2"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#14452f" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#14452f" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d="M0,400 Q200,300 400,400 T800,400 T1200,400 L1200,800 L0,800 Z"
                fill="url(#parallaxGradient1)"
              />
              <path
                d="M0,500 Q300,400 600,500 T1200,500 L1200,800 L0,800 Z"
                fill="url(#parallaxGradient2)"
                opacity="0.8"
              />
              <path
                d="M0,600 Q400,500 800,600 T1200,600 L1200,800 L0,800 Z"
                fill="url(#parallaxGradient2)"
                opacity="0.6"
              />
              <path
                d="M0,700 Q500,600 1000,700 T1200,700 L1200,800 L0,800 Z"
                fill="url(#parallaxGradient2)"
                opacity="0.4"
              />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <Fade direction="up" triggerOnce delay={0} duration={400}>
              <FeatureCard
                icon="best.svg"
                title="Premium Quality"
                description="Sourced from certified farms across India"
              />
            </Fade>
            <Fade direction="up" triggerOnce delay={100} duration={400}>
              <FeatureCard
                icon="shipping.svg"
                title="Free Shipping"
                description="On orders over $50 with fast delivery"
              />
            </Fade>
            <Fade direction="up" triggerOnce delay={200} duration={400}>
              <FeatureCard
                icon="green-leaf.svg"
                title="Freshness Guaranteed"
                description="Packed fresh to preserve aroma and flavor"
              />
            </Fade>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="products-section">
          <Fade direction="up" triggerOnce delay={0} duration={400}>
            <div className="products-header">
              <SectionTitle subtitle="Our most loved spices, chosen by thousands of home chefs">
                Best Sellers
              </SectionTitle>
            </div>
          </Fade>
          <div className="products-grid">
            {spiceProducts.slice(0, 4).map((product, index) => (
              <Fade
                key={product.id}
                direction="up"
                triggerOnce
                delay={index * 50}
                duration={400}
              >
                <ProductCard
                  name={product.name}
                  price={product.price}
                  image={product.url}
                  onClick={() => handleProductClick(product)}
                />
              </Fade>
            ))}
          </div>
          <Fade direction="up" triggerOnce delay={250} duration={400}>
            <div className="see-all-wrapper">
              <button
                className="btn btn-outline"
                onClick={() => navigate("/products")}
              >
                See All Products
              </button>
            </div>
          </Fade>
        </section>

        {/* Trending Items Section */}
        <section className="trending-section">
          <Fade direction="up" triggerOnce delay={0} duration={400}>
            <div className="trending-header">
              <SectionTitle subtitle="Most popular picks from our customers this week">
                Trending Items
              </SectionTitle>
            </div>
          </Fade>
          <div className="products-grid">
            {spiceProducts
              .reverse()
              .slice(4, 8)
              .map((product, index) => (
                <Fade
                  key={product.id}
                  direction="up"
                  triggerOnce
                  delay={index * 50}
                  duration={400}
                >
                  <ProductCard
                    name={product.name}
                    price={product.price}
                    image={product.url}
                    onClick={() => handleProductClick(product)}
                  />
                </Fade>
              ))}
          </div>
          <Fade direction="up" triggerOnce delay={250} duration={400}>
            <div className="see-all-wrapper">
              <button
                className="btn btn-outline"
                onClick={() => navigate("/products")}
              >
                See All Products
              </button>
            </div>
          </Fade>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <Fade direction="up" triggerOnce delay={0} duration={400}>
            <div className="categories-header">
              <SectionTitle subtitle="Explore our wide range of authentic spices by category">
                Shop by Category
              </SectionTitle>
            </div>
          </Fade>
          <Carousel itemsPerView={4}>
            {categories.map((category, index) => (
              <Fade
                key={category}
                direction="up"
                triggerOnce
                delay={index * 50}
                duration={400}
              >
                <CategoryCard
                  icon={
                    spiceProducts.find((product) =>
                      product.categories.includes(category)
                    )?.url
                  }
                  title={category}
                  onClick={() => handleCategoryClick(category)}
                />
              </Fade>
            ))}
          </Carousel>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="about-content">
            <Slide direction="left" triggerOnce delay={0} duration={400}>
              <div className="about-text">
                <h3>Our Story</h3>
                <h2>Bringing Authentic Indian Flavors to Your Kitchen</h2>
                <p>
                  For over 25 years, we've been sourcing the finest spices
                  directly from farmers across India. Our commitment to quality
                  means every spice is hand-selected, carefully processed, and
                  packed fresh to ensure you get the most authentic taste in
                  every dish.
                </p>
                <p>
                  From the foothills of the Himalayas to the coastal regions of
                  Kerala, we work with local farming communities to bring you
                  spices that are not only delicious but also sustainably
                  sourced and ethically traded.
                </p>
                <button className="btn btn-primary" onClick={handleShopNow}>
                  Discover Our Collection
                </button>
              </div>
            </Slide>
            <Slide direction="right" triggerOnce delay={100} duration={400}>
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80"
                  alt="Himalayan Mountains"
                  className="about-img"
                />
              </div>
            </Slide>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <Fade direction="up" triggerOnce delay={0} duration={400}>
            <SectionTitle>What Our Customers Say</SectionTitle>
          </Fade>
          <Fade direction="up" triggerOnce cascade damping={0.05} duration={400}>
            <div className="testimonials-grid">
              <TestimonialCard
                rating={5}
                text="The quality of spices is outstanding! The aroma fills my kitchen every time I open a jar. Definitely the best I've tried."
                authorName="Sarah Johnson"
                authorTitle="Home Chef"
              />
              <TestimonialCard
                rating={5}
                text="As a professional chef, I'm very particular about my spices. These are authentic, fresh, and reasonably priced. Highly recommend!"
                authorName="Michael Chen"
                authorTitle="Executive Chef"
              />
              <TestimonialCard
                rating={5}
                text="Fast shipping, beautiful packaging, and the freshest spices I've ever purchased online. Will definitely order again!"
                authorName="Priya Sharma"
                authorTitle="Food Blogger"
              />
            </div>
          </Fade>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
