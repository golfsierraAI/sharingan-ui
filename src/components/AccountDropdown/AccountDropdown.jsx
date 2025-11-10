import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Dropdown from '../Dropdown';
import './AccountDropdown.css';

const AccountDropdown = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogin = () => {
        onClose();
        navigate('/login');
    };

    const handleSignup = () => {
        onClose();
        navigate('/signup');
    };

    const handleLogout = () => {
        onClose();
        logout();
        navigate('/login');
    };

    return (
        <Dropdown isOpen={isOpen} onClose={onClose}>
            <div className="account-dropdown-menu">
                {isAuthenticated ? (
                    <button className="account-menu-item" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <button className="account-menu-item" onClick={handleLogin}>
                            Login
                        </button>
                        <button className="account-menu-item" onClick={handleSignup}>
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </Dropdown>
    );
};

export default AccountDropdown;

