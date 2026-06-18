import React from 'react';

const DrawerPanel = ({ isOpen, onClose, children }) => {
    return (
        <>
            <div className={`hp-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}></div>
            <div className={`hp-drawer ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </>
    );
};

export default DrawerPanel;
