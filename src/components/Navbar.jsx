import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">                
                <span className="logo-text">SEASONAL PLANTING GUIDE</span>
            </div>
            <div className="navbar-links">
                <NavLink to="/" className="nav-link" activeclassname="active-link">Home</NavLink>
                <NavLink to="/my-garden" className="nav-link" activeclassname="active-link">My Garden</NavLink>
                <NavLink to="/history" className="nav-link" activeclassname="active-link">History</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;

