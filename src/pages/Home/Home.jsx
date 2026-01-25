import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

// Animation constants
const FADE_ANIMATION = {
  direction: "up",
  triggerOnce: true,
  duration: 400,
};

const Home = () => {
  const [spiceProducts, setSpiceProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch products and extract categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getProducts();
        const uniqueCategories = Array.from(
          new Set(products.map((product) => product.categories).flat())
        );
        setCategories(uniqueCategories);
        setSpiceProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Set empty arrays on error to prevent UI issues
        setCategories([]);
        setSpiceProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleShopNow = () => {
    const productsSection = document.querySelector(".products-section");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleCategoryClick = (category) => {
    navigate("/products", { state: { selectedCategory: category } });
  };

  const handleSeeAllProducts = () => {
    navigate("/products");
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

        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <Fade {...FADE_ANIMATION} delay={0}>
              <FeatureCard
                icon="best.svg"
                title="Premium Quality"
                description="Sourced from certified farms across India"
              />
            </Fade>
            <Fade {...FADE_ANIMATION} delay={100}>
              <FeatureCard
                icon="shipping.svg"
                title="Free Shipping"
                description="On orders over $50 with fast delivery"
              />
            </Fade>
            <Fade {...FADE_ANIMATION} delay={200}>
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
          <Fade {...FADE_ANIMATION} delay={0}>
            <div className="products-header">
              <SectionTitle subtitle="Our most loved spices, chosen by thousands of home chefs">
                Best Sellers
              </SectionTitle>
            </div>
          </Fade>
          <div className="products-grid">
            {spiceProducts.slice(0, 4).map((product, index) => (
              <Fade key={product.id} {...FADE_ANIMATION} delay={index * 50}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  image={product.url}
                  onClick={() => handleProductClick(product)}
                />
              </Fade>
            ))}
          </div>
          <Fade {...FADE_ANIMATION} delay={250}>
            <div className="see-all-wrapper">
              <button
                className="btn btn-outline"
                onClick={handleSeeAllProducts}
              >
                See All Products
              </button>
            </div>
          </Fade>
        </section>

        {/* Trending Items Section */}
        <section className="trending-section">
          <Fade {...FADE_ANIMATION} delay={0}>
            <div className="trending-header">
              <SectionTitle subtitle="Most popular picks from our customers this week">
                Trending Items
              </SectionTitle>
            </div>
          </Fade>
          <div className="products-grid">
            {[...spiceProducts]
              .reverse()
              .slice(4, 8)
              .map((product, index) => (
                <Fade key={product.id} {...FADE_ANIMATION} delay={index * 50}>
                  <ProductCard
                    name={product.name}
                    price={product.price}
                    image={product.url}
                    onClick={() => handleProductClick(product)}
                  />
                </Fade>
              ))}
          </div>
          <Fade {...FADE_ANIMATION} delay={250}>
            <div className="see-all-wrapper">
              <button
                className="btn btn-outline"
                onClick={handleSeeAllProducts}
              >
                See All Products
              </button>
            </div>
          </Fade>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <Fade {...FADE_ANIMATION} delay={0}>
            <div className="categories-header">
              <SectionTitle subtitle="Explore our wide range of authentic spices by category">
                Shop by Category
              </SectionTitle>
            </div>
          </Fade>
          <Carousel itemsPerView={4}>
            {categories.map((category, index) => {
              const categoryProduct = spiceProducts.find((product) =>
                product.categories.includes(category)
              );
              return (
                <Fade key={category} {...FADE_ANIMATION} delay={index * 50}>
                  <CategoryCard
                    icon={categoryProduct?.url}
                    title={category}
                    onClick={() => handleCategoryClick(category)}
                  />
                </Fade>
              );
            })}
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
          <Fade {...FADE_ANIMATION} delay={0}>
            <SectionTitle>What Our Customers Say</SectionTitle>
          </Fade>
          <Fade {...FADE_ANIMATION} cascade damping={0.05}>
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
