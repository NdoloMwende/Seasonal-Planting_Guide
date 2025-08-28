import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/my-garden">My Garden</NavLink>
            <NavLink to="/history">History</NavLink>
        </nav>
    )
}

export default Navbar;

