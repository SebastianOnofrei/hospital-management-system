// import { useTranslation } from "react-i18next";
import "./App.css";
import Home from "./components/pages/Home";

function App() {
  // const { t, i18n } = useTranslation();

  return (
    <>
      {/* <p>Hello from Medical web portal</p>
      <h1>{t("welcome")}</h1>
      <button
        style={{ border: "1px solid black" }}
        onClick={() => {
          if (i18n.language === "en") {
            i18n.changeLanguage("ro");
          } else {
            i18n.changeLanguage("en");
          }
        }}
      >
        Change language
      </button> */}
      <Home/>
    </>
  );
}

export default App;
