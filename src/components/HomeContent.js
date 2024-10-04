// Title: HomeContent.js
// Author: Joel Harawa
import React, {useState} from "react";
import styled, {keyframes} from "styled-components";

const HomeContent = () => {
    const [userMood, setUserMood] = useState();
    return (
        <Container>
            <Greeting>
                <GreetingText>
                    Hi Guest, How are we feeling?
                </GreetingText>
                <Search>
                    <SearchBar
                        placeholder="Enter your mood..."

                    />
                </Search>
            </Greeting>
        </Container>
    )
}

const AnimationName = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const Container = styled.div`
    height: 90vh;
    width: 100%;
    background: linear-gradient(234deg, #A239CA, #0E0B16);
    background-size: 400% 400%;
    animation: ${AnimationName} 10s ease infinite;
    display: flex;
    justify-content: center;
`;

const Greeting = styled.div`
    display: flex;
    background-color: #2B2B2B;
    width: 60%;
    height: 20vh;
    margin-top: 10vh;
    border-radius: 25px;
    flex-direction: column;
`;

const GreetingText = styled.a`
    color: #4717F6;
    font-size: 3em;
    margin-left: 2vw;
    font-family: "Poppins", system-ui;
`;

const Search = styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
`;

const SearchBar = styled.input`
    width: 90%;
    border: 1px solid #4717F6;
    height: 2vh;
    margin-top: 3vh;
    background: none;
    border-radius: 25px;
    font-size: 1.5em;
    padding: 1.5vh;
    color: #A239CA;
`;

export default HomeContent;