import React, { useState, useContext } from "react";
import axios from "axios";
import "../../css/login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const { setCurrentUserData } = useContext(AuthContext);

    const login = async () => {
        try {
            const response = await axios.post("/api/login", form);
            if (response.status === 200) {
                navigate("/");
                setCurrentUserData(response.data);
            }
        } catch (error) {
            alert(error);
        }
    };
    const handleChangePassword = (event: any) => {
        setForm({ ...form, password: event.target.value });
    };
    const handleChangeEmail = (event: any) => {
        setForm({ ...form, email: event.target.value });
    };
    return (
        <div className="form-wrapper">
            <h1>Sign In</h1>
            <form>
                <div className="form-item">
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email Address"
                        onChange={handleChangeEmail}
                    ></input>
                </div>
                <div className="form-item">
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        onChange={handleChangePassword}
                    ></input>
                </div>
                <div className="button-panel">
                    <button className="button" type="button" onClick={login}>
                        submit
                    </button>
                </div>
            </form>
            <div className="form-footer"></div>
        </div>
    );
};

export default Login;
