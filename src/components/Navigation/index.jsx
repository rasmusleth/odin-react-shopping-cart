import { NavLink } from "react-router-dom";
import "./navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/" end className="nav-link">
        Home
      </NavLink>
      <NavLink to="/menu" className="nav-link">
        Menu
      </NavLink>
      <NavLink to="/cart" className="nav-link">
        Cart
      </NavLink>
    </nav>
  );
}

export default Navigation;
