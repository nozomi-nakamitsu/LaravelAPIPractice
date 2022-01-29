import React, { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";
type IAuthContext = {
    currentUser?: any;
    setCurrentUserData: (user: any) => void;
    deleteCurrentUserData: () => void;
};

// 初期値を作成するが、eslintに引っかかるのでeslint-disableにしてます
// eslint-disable-next-line @typescript-eslint/no-empty-function
const AuthContext = createContext<IAuthContext>({
    currentUser: undefined,
    setCurrentUserData: () => {},
    deleteCurrentUserData: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<any | undefined>();
    const setCurrentUserData = (user: any) => {
        setCurrentUser(user);
    };
    const deleteCurrentUserData = () => {
        setCurrentUser(undefined);
    };
    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/user");
            setCurrentUser(response.data);
        })();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser: currentUser,
                setCurrentUserData: setCurrentUserData,
                deleteCurrentUserData: deleteCurrentUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
