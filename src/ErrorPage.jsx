import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import {
  lightModeColors,
  darkModeColors,
} from "./assets/javascript/colorTheme";
import { CartProvider } from "./components/Cart/CartContext";

const ErrorPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // # Color Theme
  const toggleColorTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      for (let colorKey in darkModeColors) {
        document.documentElement.style.setProperty(
          colorKey,
          darkModeColors[colorKey]
        );
      }
    } else {
      for (let colorKey in lightModeColors) {
        document.documentElement.style.setProperty(
          colorKey,
          lightModeColors[colorKey]
        );
      }
    }
  }, [isDarkMode]);

  return (
    <CartProvider>
      <>
        <Navigation
          isDarkMode={isDarkMode}
          onColorThemeClick={toggleColorTheme}
        />
        <div className="errorPageWrapper">
          <div>
            <h1 className="heading-style-h3">Sorry, page not found</h1>
            <div className="spacerSmall"></div>
            <p>We cannot find the page you are looking for..</p>
            <div className="spacerXSmall"></div>
            <p>Looking for the menu? Click the button below</p>
          </div>
          <div className="spacerSmall"></div>
          <Link to="/" className="btn btnPrimary">
            Go to menu
          </Link>
        </div>
      </>
    </CartProvider>
  );
};

export default ErrorPage;
