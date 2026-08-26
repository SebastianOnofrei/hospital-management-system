import { Header } from "../organisms/Header/Header.tsx";
import Footer from "../organisms/Footer/Footer.tsx";
import './Home.css';
import logo from '../../assets/pictures/gg-logo.jpg';
import { Button } from "../atoms/Button.tsx";
import { Hero } from "../organisms/Hero/Hero.tsx";

const headerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Prices', href: '/prices' },
  { label: 'Performances', href: '/performances' },
  { label: 'Contributions', href: '/contributions' },
];

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
    text: 'State-of-the-Art Medical Care for You & Your Family',
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    text: 'Expert Doctors Available 24/7 for Online & Offline Consultations',
  },
  {
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80',
    text: 'Advanced Surgical Technologies & Specialized Diagnostics',
  },
];

const Home = () => {
  return (
    <div className="home-layout">
      <Header 
        logo={logo}
        links={headerLinks} 
        action={
          <div className="header-buttons">
            <Button text="Appointments" className="btn"/>
            <Button text="Login" className="btn-primary" />
          </div>
        }
      />

      {/* Renders as dynamic slider when passed an array */}
      <Hero data={heroSlides} interval={6000} />

      {/* Alternative: Pass a single object to render a static Hero banner */}

      <main className="main-content">
        {/* Page content goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;