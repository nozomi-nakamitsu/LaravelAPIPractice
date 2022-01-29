import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const Top = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const logout = async () => {
        const response = await axios.post("/api/logout");
        console.log(response);
        if (response.status === 200) {
            navigate("/login");
        }
    };
    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/user");

            setUser(response.data);
        })();
    }, []);
    return (
        <div className="top">
            <button type="button" onClick={logout}>
                ログアウト
            </button>
            <div>
                <p>ログインユーザー</p>
                <div>{user ? <p>{user.name}</p> : null}</div>
            </div>
        </div>
    );
};

export default Top;
