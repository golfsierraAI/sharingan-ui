import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess/CheckoutSuccess";
import Orders from "./pages/Orders/Orders";
import FAQ from "./pages/FAQ/FAQ";
import OurStory from "./pages/OurStory/OurStory";
import Sustainability from "./pages/Sustainability/Sustainability";
import Sourcing from "./pages/Sourcing/Sourcing";
import Contact from "./pages/Contact/Contact";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<OurStory />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/sourcing" element={<Sourcing />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
