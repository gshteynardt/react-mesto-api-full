import React from 'react';
import logoPath from '../images/logo_mesto.svg';

const Header = ({ children }) => (
    <header className="header page__header">
      <picture className="logo header__logo">
        <img className="logo__img" src={logoPath} alt="логотип"/>
      </picture>
      {children}
    </header>
);

export default Header;
