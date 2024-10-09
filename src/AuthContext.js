import React, {createContext, useEffect, useState} from "react";

const CLIENT_ID = "69df94900568478790af02c965324d0f";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPES = ["playlist-modify-public", "playlist-modify-private", "playlist-read-private", "playlist-read-collaborative", "user-top-read"];
const SCOPES_URL = SCOPES.join("%20");
const RESPONSE_TYPE = "token";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const hash = window.location.hash;
        let localToken = window.localStorage.getItem("token");
        
        //if we don't have a token and the hash is set
        if (!localToken && hash) {
            try {
            localToken = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1];
            //store token in local storage
            window.localStorage.setItem("token", localToken);
            window.location.hash = "";
            setToken(localToken);
            console.log(token);
            } catch (error) {
                console.error("Error extracting the access token.")
            }
        } else if (localToken) {
            setToken(localToken);
        }
    }, []);

    const login = () => {
        console.log("THIS IS RUNNING");
        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=${RESPONSE_TYPE}`;
        window.location.replace(authUrl);
    }

    const logout = () => {
        console.log("logging out!!")
        setToken(null);
        window.localStorage.removeItem("token");
        console.log("this is the token", token);
    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;