// Title: HomeContent.js
// Author: Joel Harawa
import styled, {keyframes} from "styled-components";

const HomeContent = () => {
    return (
        <Container>
            <Greeting>
                <GreetingText>
                    Hi Guest, How are we feeling?
                </GreetingText>
                <Search>
                    <SearchBar/>
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
    height: 25%;
    border-radius: 25px;
    flex-direction: column;
`;

const GreetingText = styled.a`
    color: #4717F6;
    font-size: 3em;
    margin: 2.5%;
    font-family: "Poppins", system-ui;
`;

const Search = styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
    margin-top: 5%;
`;

const SearchBar = styled.input`
    width: 95%;
    border: 1px solid #4717F6;
    height: 70%;
    background: none;
    border-radius: 25px;
`;

export default HomeContent