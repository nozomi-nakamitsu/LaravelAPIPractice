import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Top from "./Top";
import Login from "./Login";
import Header from "./Header";
import { AuthProvider } from "./Auth";

const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Top />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};
export default Router;
