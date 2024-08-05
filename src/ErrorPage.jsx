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
    <>
      <CartProvider>
        <Navigation
          isDarkMode={isDarkMode}
          onColorThemeClick={toggleColorTheme}
        />
        <div>
          <h1>Sorry, we cannot find the page you're looking for..</h1>
          <Link to="/shop">Go to shop</Link>
        </div>
      </CartProvider>
    </>
  );
};

export default ErrorPage;
