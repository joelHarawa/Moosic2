// Title: Navbar.js
// Author: Joel Harawa
// Purpose: Implement Navbar for users on the website

import styled from "styled-components";
import isMobile from "is-mobile";
import { useEffect, useState } from "react";

const Navbar = () => {
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
            <Right>
                <ProfileContainer ismobile={isMobileDevice.toString()}>
                </ProfileContainer>
            </Right>
        </Container>
    )
}

const Container = styled.div`
    background-color: #2B2B2B;
    display: flex;
    height: 10%;
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
`;

export default Navbar;
