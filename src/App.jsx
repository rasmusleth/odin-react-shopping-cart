import { Outlet, useMatch } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState, useReducer } from "react";
import { cartReducer, initialCartState } from "./components/Cart/cartReducer";
import "./assets/css/global.css";
import ItemDialog from "./components/ItemDialog/ItemDialog";
import { handleBodyOnModalOpen } from "./components/ItemDialog/itemDialogHelpers";
import {
  lightModeColors,
  darkModeColors,
} from "./assets/javascript/colorTheme";

function App() {
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [cartLength, setCartLength] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isMenu = useMatch("/menu");
  const isCart = useMatch("/cart");

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

  useEffect(() => {
    if (!cart) return;

    const length = cart.items.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);

    setCartLength(length);
  }, [cart]);

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
    <div className="pageWrapper">
      <Navigation
        cartLength={cartLength}
        isCart={isCart}
        isDarkMode={isDarkMode}
        onColorThemeClick={toggleColorTheme}
      />
      <main>
        <Outlet
          context={{
            cart,
            cartDispatch,
            cartLength,
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
        cartDispatch={cartDispatch}
        action={isMenu ? "add" : isCart ? "edit" : null}
      />
    </div>
  );
}

export default App;
