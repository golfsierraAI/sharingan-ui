import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import './CongratsModal.css';

const CongratsModal = ({ isOpen, onClose, productName, quantity }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="congrats-overlay" onClick={onClose}>
            <div className="congrats-modal" onClick={(e) => e.stopPropagation()}>
                <div className="congrats-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h2>Congratulations!</h2>
                <p>
                    <strong>{quantity}x {productName}</strong> has been added to your cart!
                </p>
                <div className="congrats-actions">
                    <Button variant="primary" onClick={() => navigate('/cart')}>
                        View Cart
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CongratsModal;

