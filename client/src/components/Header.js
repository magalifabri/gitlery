import React from 'react';
import '../styling/Header.scss';


const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">Gitlery</h1>
            <p className="header__subtitle">GitHub Gallery creator</p>
        </header>
    );
};

export default Header;
