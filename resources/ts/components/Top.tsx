import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import PhotoForm from "./PhotoForm";

const Top = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const logout = async () => {
        try {
            const response = await axios.post("/api/logout");
            if (response.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        }
    };
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/user");
                setUser(response.data);
            } catch (error) {
                alert(error);
            }
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
            <hr />
            <PhotoForm />
        </div>
    );
};

export default Top;
