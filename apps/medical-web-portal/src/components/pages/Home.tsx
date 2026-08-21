import Header from "../organisms/Header/Header";
import Footer from "../organisms/Footer/Footer";
import './Home.css';

const Home = () => {
 return (
    <div className="home-layout">
      <Header />
      <main className="main-content">
        {/* Page content or loading state goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
