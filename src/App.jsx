import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState(null);

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

  return (
    <>
      <Navigation />
      <main>
        <Outlet context={[cart, setCart]} />
      </main>
    </>
  );
}

export default App;
