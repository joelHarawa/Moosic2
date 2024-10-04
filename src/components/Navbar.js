// Title: Navbar.js
// Author: Joel Harawa
// Purpose: Implement Navbar for users on the website

import styled from "styled-components";
import isMobile from "is-mobile";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
    const token = window.localStorage.getItem("token");
    const {login, logout} = useContext(AuthContext);
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        setIsMobileDevice(isMobile());
    }, [isMobileDevice])

    return (
        <Container>
            <Left/>
            <Middle>
                <Logo ismobile={isMobileDevice.toString()}>Moosic</Logo>
            </Middle>
                {token ? 
                    <Right>
                        <ProfileContainer ismobile={isMobileDevice.toString()} onClick={logout}/>
                        <MenuItem href="/">Logout</MenuItem>
                    </Right>:
                    <Right>
                        <ProfileContainer ismobile={isMobileDevice.toString()} onClick={login}/>
                    </Right>
                }
        </Container>
    )
}

const Container = styled.div`
    background-color: #2B2B2B;
    display: flex;
    height: 10vh;
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
    height: ${(props) => (props.ismobile === "true" ? "30px" : "40px")};
    margin-right: ${(props) => (props.ismobile === "true" ? "10px" : "50px")};
    width: ${(props) => (props.ismobile === "true" ? "30px" : "40px")};
    &:hover {
        cursor: pointer;
    }
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

export default Navbar;
