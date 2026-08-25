import {Header} from "../organisms/Header/Header.tsx";
import Footer from "../organisms/Footer/Footer.tsx";
import './Home.css';
import logo from '../../assets/pictures/gg-logo.jpg';
import { Button } from "../atoms/Button.tsx";

const headerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Prices', href: '/prices' },
  { label: 'Performances', href: '/performances' },
  { label: 'Contributions', href: '/contributions' },
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
      <main className="main-content">
        {/* Page content or loading state goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
