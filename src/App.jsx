import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState(null);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    // OBS: Fetch cart here ...
    const cartStarterInfo = {
      customerInfo: {
        name: "",
        emailAddress: "",
      },
      items: [],
      takeAway: false,
      tableNumber: -1,
      bill: 0,
    };

    setCart(cartStarterInfo);
  }, []);

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
        <Outlet context={[cart, setCart, cartLength]} />
      </main>
    </>
  );
}

export default App;
