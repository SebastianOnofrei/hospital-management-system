// import { useTranslation } from "react-i18next";
import "./App.css";
import Footer from "./components/organisms/Footer/Footer";
import Hero from "./components/organisms/Hero";

function App() {
  // const { t, i18n } = useTranslation();

  return (
    // <>
    //   <p>Hello from the admin dashboard</p>
    //   <h1>{t("welcome")}</h1>
    //   <button
    //     style={{ border: "1px solid black" }}
    //     onClick={() => {
    //       if (i18n.language === "en") {
    //         i18n.changeLanguage("ro");
    //       } else {
    //         i18n.changeLanguage("en");
    //       }
    //     }}
    //   >
    //     Change language
    //   </button>
    // </>
     <div className="home-layout">
      <Hero />
      <main className="main-content">
        {/* Page content or loading state goes here */}
      </main>
      <Footer />
    </div>
)
}

export default App;
