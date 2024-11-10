// Title: Navbar.js
// Author: Joel Harawa

import styled from "styled-components";
import isMobile from "is-mobile";
import { useEffect, useState } from "react";

// Constants
const DEFAULT_PHOTO = "https://img.icons8.com/?size=100&id=z" +
                      "-JBA_KtSkxG&format=png&color=000000";

// Navbar component
const Navbar = () => {
    // State variables
    const [user, setUser] = useState("Guest");
    const [photo, setPhoto] = useState(DEFAULT_PHOTO);
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        // Check if device is a mobile device, update state varible
        setIsMobileDevice(isMobile());
    }, [isMobileDevice]);
    
    useEffect(() => {
        const apiUrl = "http://localhost:4000/api/auth/user";
        // Retrieve user profile information, update user's state variables
        const getUserProfile = async () => {
            try {
                // Get request to get user's profile information
                const response = await fetch(apiUrl, {
                    method: "GET",
                    credentials: "include"
                });

                // If the response is OK set the user's state variables
                if (response.status === 200) {
                    const rawData = await response.json();
                    const data = JSON.parse(rawData);
                    setPhoto(data.images[0].url);
                    setUser(data.display_name);
                }
            } catch (error) {
                console.error("Error retrieving user profile: ", error);
            }
        }
        getUserProfile();
    }, []);

    // Log the user into the client using Spotify API
    const login = async () => {
        const response = await fetch("http://localhost:4000/api/auth/login");
        const data = await response.json();
        window.location.href = data.url;
    }

    // Log the user out the client
    const logout = async () => {
        try {
            const apiUrl = "http://localhost:4000/api/auth/logout";
            const response = await fetch(apiUrl, {
                method: "POST",
                credentials: "include"
            });
            if (response.status === 200) {
                window.location.reload();
                console.log("Successfully Logged user out.");
            }
        } catch (error) {
            console.error("Error logging out user: ", error);
        }
    }

    return (
        <Container>
            <Left/>
            <Middle>
                <Logo ismobile={isMobileDevice.toString()} href="/">Moosic</Logo>
            </Middle>
                {user !== "Guest" ? 
                    <Right>
                        <ProfileContainer ismobile={isMobileDevice.toString()}>
                            <ProfilePhoto src={photo}/>
                        </ProfileContainer>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Right>:
                    <Right>
                        <ProfileContainer ismobile={isMobileDevice.toString()} onClick={login}>
                            <ProfilePhoto src={photo}/>
                        </ProfileContainer>
                    </Right>
                }
        </Container>
    )
}

const Container = styled.div`
    background-color: #2B2B2B;
    display: flex;
    height: 10%;
    width: 100%;
`;

// Left side of the Navbar
const Left = styled.div`
    flex: 1;
`;

// Middle of the Navbar
const Middle = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.a`
    color: #A239CA;
    font-family: "Poppins", system-ui;
    font-size: ${(props) => (props.ismobile === "true" ? "3em" : "4em")};
    text-decoration: none;
`;

// Right side of the Navbar
const Right = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
`;

const ProfileContainer = styled.div`
    background-color: white;
    border-radius: 50%;
    display: flex;
    height: ${(props) => (props.ismobile === "true" ? "30px" : "50px")};
    margin-right: ${(props) => (props.ismobile === "true" ? "10px" : "50px")};
    width: ${(props) => (props.ismobile === "true" ? "30px" : "50px")};
    &:hover {
        cursor: pointer;
    }
    overflow: hidden;
`;

const MenuItem = styled.a`
    font-family: "Poppins", system-ui;
    font-size: 1.25em;
    color: #4717F6;
    margin-right: 50px;
    text-decoration: none;
    &:hover {
        text-decoration: none;
        color: white;
    }
`;

const ProfilePhoto = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

export default Navbar;
