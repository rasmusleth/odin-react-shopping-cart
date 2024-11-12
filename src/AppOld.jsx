import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";
import "./assets/css/global.css";
import ItemDialog from "./components/ItemDialog/ItemDialog";
import { handleBodyOnModalOpen } from "./components/ItemDialog/itemDialogHelpers";
import {
  lightModeColors,
  darkModeColors,
} from "./assets/javascript/colorTheme";
import { CartProvider } from "./components/Cart/CartContext";

function AppOld() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  // # ITEM DIALOG
  const handleModalClose = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  // # Body overflow when modal is open
  useEffect(() => {
    handleBodyOnModalOpen(modalIsOpen);
  }, [modalIsOpen]);

  return (
    <CartProvider>
      <div className="pageWrapper">
        <Navigation
          isDarkMode={isDarkMode}
          onColorThemeClick={toggleColorTheme}
        />
        <main>
          <Outlet
            context={{
              modalIsOpen,
              setModalIsOpen,
              selectedItem,
              setSelectedItem,
            }}
          />
        </main>
        <ItemDialog
          item={selectedItem}
          modalIsOpen={modalIsOpen}
          onClose={handleModalClose}
        />
      </div>
    </CartProvider>
  );
}

export default AppOld;
