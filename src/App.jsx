import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { CartProvider } from "./contexts/CartContext";
import { MenuProvider } from "./contexts/MenuContext";
import { ModalProvider } from "./contexts/ModalContext";

function App() {
  return (
    <CartProvider>
      <MenuProvider>
        <ModalProvider>
          <Navigation />
          <Outlet />
        </ModalProvider>
      </MenuProvider>
    </CartProvider>
  );
}

export default App;
