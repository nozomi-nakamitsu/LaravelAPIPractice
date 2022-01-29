import React from "react";
import { Link } from "react-router-dom";
import "../../css/header.css";
const Header = () => {
    return (
        <header className="header-5">
            <div className="header-inner">
                <div className="logo"></div>
                <nav className="header-nav">
                    <ul className="header-nav-list">
                        <Link to="/">
                            <li className="header-nav-item">TOP</li>
                        </Link>
                        <Link to="/login">
                            <li className="header-nav-item">Login</li>
                        </Link>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
