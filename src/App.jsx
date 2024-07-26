import { Outlet, useMatch } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState, useReducer } from "react";
import { cartReducer, initialCartState } from "./assets/javascript/cartReducer";
import "./assets/global.css";
import ItemDialog from "./components/ItemDialog/ItemDialog";
import { handleBodyOnModalOpen } from "./assets/javascript/itemModalHelpers";

function App() {
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [cartLength, setCartLength] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isMenu = useMatch("/menu");
  const isCart = useMatch("/cart");

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

  // Handle body overflow when modal is open
  useEffect(() => {
    handleBodyOnModalOpen(modalIsOpen);
  }, [modalIsOpen]);

  return (
    <>
      <Navigation
        cartLength={cartLength}
        onColorChange={toggleDarkMode}
        darkMode={darkMode}
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
      {selectedItem && (
        <ItemDialog
          item={selectedItem}
          modalIsOpen={modalIsOpen}
          onClose={handleModalClose}
          cartDispatch={cartDispatch}
          action={isMenu ? "add" : isCart ? "edit" : null}
        />
      )}
    </>
  );
}

export default App;
