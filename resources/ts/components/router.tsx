import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Top from "./Top";
import Login from "./Login";
import Header from "./Header";


const Router = () => {
    return (
        <BrowserRouter>
            {/* <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav> */}
            <Header/>
            <Routes>
                <Route path="/" element={<Top />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
