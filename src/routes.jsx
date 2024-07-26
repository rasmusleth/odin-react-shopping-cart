import Menu from "./components/Menu/Menu.jsx";
import App from "./App.jsx";
import Cart from "./components/Cart/Cart.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
