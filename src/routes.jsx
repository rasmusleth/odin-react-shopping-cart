import Menu from "./components/Menu/Menu.jsx";
import Home from "./components/Home/Home.jsx";
import App from "./App.jsx";

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
    ],
  },
];

export default routes;
