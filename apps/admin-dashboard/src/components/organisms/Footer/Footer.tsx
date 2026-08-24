import React from 'react';
import './Footer.css';
import '../../../styles/reset.css';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Emergencies',
    links: [
      { label: '24/7 Emergency Services', href: '#emergency-services' },
      { label: 'Contact Emergency Department', href: '#contact-emergency' },
      { label: 'Emergency Protocols', href: '#protocols' },
    ],
  },
  {
    title: 'Payments',
    links: [
      { label: 'Billing', href: '#billing' },
      { label: 'Accounts', href: '#accounts' },
      { label: 'Support', href: '#support' },
    ],
  },
  {
    title: 'About App',
    links: [
      { label: 'Latest news and updates.', href: '#news' },
      { label: 'Update app', href: '#update' },
    ],
  },
];

// We use react functional component to create the Footer component. 
// It maps through the FOOTER_SECTIONS array and renders each section with its title and links.

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {FOOTER_SECTIONS.map((section) => (
        <div key={section.title} className="footer-column">
          <h4>{section.title}</h4>
          <ul>
            {section.links.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
};

export default Footer;