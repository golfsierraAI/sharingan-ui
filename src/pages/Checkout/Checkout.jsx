import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import AppHeader from '../../components/AppHeader';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart, getCartTotal } = useCart();

    const subtotal = getCartTotal();
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';

        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            console.log('Order placed:', formData);
            clearCart();
            navigate('/');
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="checkout-container">
            <AppHeader />

            <main className="checkout-main">
                <div className="checkout-content">
                    <h1 className="checkout-title">Checkout</h1>

                    <div className="checkout-layout">
                        <div className="checkout-form-section">
                            <form onSubmit={handleSubmit}>
                                <Card>
                                    <h2 className="section-heading">Contact Information</h2>
                                    <Input
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        error={errors.email}
                                    />
                                </Card>

                                <Card>
                                    <h2 className="section-heading">Shipping Address</h2>
                                    <div className="form-row">
                                        <Input
                                            label="First Name"
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            error={errors.firstName}
                                        />
                                        <Input
                                            label="Last Name"
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            error={errors.lastName}
                                        />
                                    </div>
                                    <Input
                                        label="Address"
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="123 Main St"
                                        required
                                        error={errors.address}
                                    />
                                    <div className="form-row">
                                        <Input
                                            label="City"
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            error={errors.city}
                                        />
                                        <Input
                                            label="State"
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="CA"
                                            required
                                            error={errors.state}
                                        />
                                        <Input
                                            label="ZIP Code"
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            placeholder="12345"
                                            required
                                            error={errors.zipCode}
                                        />
                                    </div>
                                </Card>

                                <Card>
                                    <h2 className="section-heading">Payment Information</h2>
                                    <Input
                                        label="Card Number"
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        placeholder="1234 5678 9012 3456"
                                        required
                                        error={errors.cardNumber}
                                    />
                                    <div className="form-row">
                                        <Input
                                            label="Expiry Date"
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleChange}
                                            placeholder="MM/YY"
                                            required
                                            error={errors.expiryDate}
                                        />
                                        <Input
                                            label="CVV"
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            placeholder="123"
                                            required
                                            error={errors.cvv}
                                        />
                                    </div>
                                </Card>

                                <div className="checkout-actions">
                                    <Button type="submit" variant="primary" fullWidth>
                                        Place Order - ${total.toFixed(2)}
                                    </Button>
                                    <Button type="button" variant="secondary" fullWidth onClick={() => navigate('/cart')}>
                                        Return to Cart
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="checkout-summary">
                            <Card>
                                <h2 className="section-heading">Order Summary</h2>

                                <div className="summary-items">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="summary-item">
                                            <div className="summary-item-info">
                                                <span className="summary-item-name">{item.name}</span>
                                                <span className="summary-item-qty">× {item.quantity}</span>
                                            </div>
                                            <span className="summary-item-price">
                                                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-row summary-total">
                                    <strong>Total</strong>
                                    <strong>${total.toFixed(2)}</strong>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;

