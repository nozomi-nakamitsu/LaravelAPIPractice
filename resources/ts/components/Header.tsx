import { Link } from "react-router-dom";
import "../../css/header.css";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";

const Header = () => {
    const navigate = useNavigate();
    const { currentUser, deleteCurrentUserData } = useContext(AuthContext);
    const logout = async () => {
        try {
            const response = await axios.post("/api/logout");
            if (response.status === 200) {
                navigate("/login");
                deleteCurrentUserData();
            }
        } catch (error) {
            alert(error);
        }
    };
    return (
        <header className="header-5">
            <div className="header-inner">
                <div className="logo"></div>
                <nav className="header-nav">
                    <ul className="header-nav-list">
                        {currentUser ? (
                            <>
                                <li className="header-nav-item -mr0">
                                    {currentUser
                                        ? `${currentUser.name}さんこんにちは`
                                        : null}
                                </li>
                                <li
                                    className="header-nav-item"
                                    onClick={logout}
                                >
                                    ログアウト
                                </li>
                            </>
                        ) : (
                            <>
                                <Link to="/">
                                    <li className="header-nav-item">TOP</li>
                                </Link>
                                <Link to="/login">
                                    <li className="header-nav-item">Login</li>
                                </Link>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
