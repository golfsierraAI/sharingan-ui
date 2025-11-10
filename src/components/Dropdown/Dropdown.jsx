import './Dropdown.css';

const Dropdown = ({ isOpen, onClose, children, noOverlay = false }) => {
  if (!isOpen) return null;

  return (
    <>
      {!noOverlay && <div className="dropdown-overlay" onClick={onClose}></div>}
      <div className="dropdown-menu">
        {children}
      </div>
    </>
  );
};

export default Dropdown;

