import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Top from "../pages/Top";
import Login from "../pages/Login";
import Header from "./Header";
import PhotoShow from "../pages/PhotoShow";

import { AuthProvider } from "./Auth";

const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Top />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/photo/:id" element={<PhotoShow/>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};
export default Router;
