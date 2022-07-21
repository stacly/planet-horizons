import React from "react";
import { Link } from "react-router-dom";
import '../Header.css'

const Header = ({ children }) => {

    const style = {
        display: "inline-block",
        margin: 10
    };

    return (
        <div className="Header">
            <div>
                {/* use Link to=, not href=. href refreshed the component */}
                <h2 style={style}>
                    <Link to="/">Home</Link>
                </h2>
                <h2 style={style}>
                    <Link to="/planets">Planets</Link>
                </h2>
                <h2 style={style}>
                    <Link to="/dwarfplanets">Dwarf Planets</Link>
                </h2>
                <h2 style={style}>
                    <Link to="/search">Search</Link>
                </h2>
            </div>
            {children}
        </div>
    );
};

export default Header;
