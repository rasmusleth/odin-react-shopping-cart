import Menu, { loader as menuLoader } from "./components/Menu/Menu.jsx";
import App from "./App.jsx";
import Cart from "./components/Cart/Cart.jsx";
import ErrorPage from "./ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Menu />,
            loader: menuLoader,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
];

export default routes;
