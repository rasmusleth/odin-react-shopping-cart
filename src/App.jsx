import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import styles from "./app.module.css";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
