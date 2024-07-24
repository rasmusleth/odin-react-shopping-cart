import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState, useReducer } from "react";
import { cartReducer, initialCartState } from "./assets/javascript/cartReducer";
import "./assets/global.css";

function App() {
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [cartLength, setCartLength] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!cart) return;

    const length = cart.items.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);

    setCartLength(length);
  }, [cart]);

  return (
    <>
      <Navigation cartLength={cartLength} />
      <main>
        <Outlet
          context={[
            cart,
            cartDispatch,
            cartLength,
            modalIsOpen,
            setModalIsOpen,
            selectedItem,
            setSelectedItem,
          ]}
        />
      </main>
    </>
  );
}

export default App;
