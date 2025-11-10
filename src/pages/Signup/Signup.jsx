import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const { register, login, isAuthenticated, loading: authLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Redirect to home if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, authLoading, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            setErrors({});

            // Register the user
            const registerResult = await register(formData.name, formData.email, formData.password);

            if (registerResult.success) {
                // Auto-login after successful registration
                const loginResult = await login(formData.email, formData.password);
                
                if (loginResult.success) {
                    navigate('/');
                } else {
                    // Registration successful but login failed, redirect to login page
                    navigate('/login');
                }
            } else {
                setErrors({
                    email: registerResult.error || 'Registration failed. Please try again.'
                });
            }

            setLoading(false);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="signup-container">
            <Card className="signup-card">
                <div className="signup-header">
                    <h1>Join Spice Bazaar</h1>
                    <p>Create an account to start shopping</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                    <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Enter your full name"
                    />

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="Enter your email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Create a password (min. 6 characters)"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        placeholder="Confirm your password"
                    />

                    <Button type="submit" variant="primary" fullWidth disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                <div className="login-prompt">
                    <p>Already have an account? <a href="/login" className="link">Sign In</a></p>
                </div>
            </Card>
        </div>
    );
};

export default Signup;

