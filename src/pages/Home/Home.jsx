import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <FeatureCard
              icon="🌿"
              title="100% Organic"
              description="Sourced from certified organic farms across India"
            />
            <FeatureCard
              icon="🚚"
              title="Free Shipping"
              description="On orders over $50 with fast delivery"
            />
            <FeatureCard
              icon="✨"
              title="Freshness Guaranteed"
              description="Packed fresh to preserve aroma and flavor"
            />
            <FeatureCard
              icon="💯"
              title="Quality Assured"
              description="Lab tested and certified for purity"
            />
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="products-section">
          <div className="products-header">
            <span className="products-badge">⭐ Best Sellers</span>
            <SectionTitle subtitle="Our most loved spices, chosen by thousands of home chefs">
              Best Sellers
            </SectionTitle>
          </div>
          <div className="products-grid">
            {spiceProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.url}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
          <div className="see-all-wrapper">
            <button
              className="btn btn-outline"
              onClick={() => navigate("/products")}
            >
              See All Products
            </button>
          </div>
        </section>

        {/* Trending Items Section */}
        <section className="trending-section">
          <div className="trending-header">
            <span className="trending-badge">🔥 Hot Right Now</span>
            <SectionTitle subtitle="Most popular picks from our customers this week">
              Trending Items
            </SectionTitle>
          </div>
          <div className="products-grid">
            {spiceProducts
              .reverse()
              .slice(4, 8)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.url}
                  onClick={() => handleProductClick(product)}
                />
              ))}
          </div>
          <div className="see-all-wrapper">
            <button
              className="btn btn-outline"
              onClick={() => navigate("/products")}
            >
              See All Products
            </button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="categories-header">
            <span className="categories-badge">📦 Browse Categories</span>
            <SectionTitle subtitle="Explore our wide range of authentic spices by category">
              Shop by Category
            </SectionTitle>
          </div>
          <Carousel itemsPerView={4}>
            {categories.map((category, index) => (
              <CategoryCard
                key={category}
                icon={
                  spiceProducts.find((product) =>
                    product.categories.includes(category)
                  )?.url
                }
                title={category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </Carousel>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h3>Our Story</h3>
              <h2>Bringing Authentic Indian Flavors to Your Kitchen</h2>
              <p>
                For over 25 years, we've been sourcing the finest spices
                directly from farmers across India. Our commitment to quality
                means every spice is hand-selected, carefully processed, and
                packed fresh to ensure you get the most authentic taste in every
                dish.
              </p>
              <p>
                From the foothills of the Himalayas to the coastal regions of
                Kerala, we work with local farming communities to bring you
                spices that are not only delicious but also sustainably sourced
                and ethically traded.
              </p>
              <button className="btn btn-primary" onClick={handleShopNow}>
                Discover Our Collection
              </button>
            </div>
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80"
                alt="Himalayan Mountains"
                className="about-img"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <SectionTitle>What Our Customers Say</SectionTitle>
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
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
