import './Footer.css'
import '../../../styles/reset.css'

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
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Guides', href: '#' }, 
    ],
  },
  {
    title: 'Quick Access',
    links: [
      { label: 'Home', href: '#' },
      { label: 'About Us', href: '#' },
      { label: 'Services', href: '#' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Email', href: 'mailto:support@med.ro' },
      { label: 'Phone', href: 'tel:+40721628821' },
      { label: 'Location', href: '#' },
    ],
  }
]

// We use react functional component to create the Footer component. 
// It maps through the FOOTER_SECTIONS array and renders each section with its title and links.

const Footer = () => {
  return (
    <footer className="footer">
      {FOOTER_SECTIONS.map((section, index) => (
        <div className="footer-column" key={index}>
          <h4>{section.title}</h4>
          <ul>
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  )
}

export default Footer
