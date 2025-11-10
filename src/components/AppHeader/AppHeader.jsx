import Header from '../Header';
import Marquee from '../Marquee';
import './AppHeader.css';

const AppHeader = () => {
    return (
        <div className="app-header">
            <Header />
            <Marquee />
        </div>
    );
};

export default AppHeader;

