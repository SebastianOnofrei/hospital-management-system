import React from 'react';
import './Header.css';

// Defining the shape of a link
export interface NavLink {
  label: string;
  href: string;
}

// 2. Defining the Header props
export interface HeaderProps {
  logo: string | React.ReactNode;
  links: NavLink[];
  action?: React.ReactNode;
}

// Building the component as a functional component with defined prop types
export const Header: React.FC<HeaderProps> = ({ logo, links, action }) => {
  return (
    <header className="header-container">
      <div className="logo-container">
        {typeof logo === 'string' ? (
          <img src={logo} alt="HMS Logo" className="h-8" />
        ) : (
          logo
        )}
      </div>
      <nav>
        {links.map((link, index) => (
          <a key={index} href={link.href} className="navigation-link">
            {link.label}
          </a>
        ))}
      </nav>
      {action && <div className="header-actions">{action}</div>}
    </header>
  );
};