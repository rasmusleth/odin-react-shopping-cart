import Menu from "./components/Menu/Menu.jsx";
import Home from "./components/Home/Home.jsx";
import App from "./App.jsx";
import Cart from "./components/Cart/Cart.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
