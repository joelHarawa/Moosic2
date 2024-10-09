//Title: Home.js
//Author: Joel Harawa
import Navbar from "../components/Navbar";
import styled, {keyframes} from "styled-components";
import SearchComponent from "../components/SearchComponent";

const Home = () => {
    return (
        <Container>
            <Navbar/>
            <SearchComponent/>
        </Container>
    )
}

const AnimationName = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const Container = styled.div`
    height: 100%;
    width: 100%;
    background: linear-gradient(234deg, #A239CA, #0E0B16);
    background-size: 400% 400%;
    animation: ${AnimationName} 10s ease infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;

export default Home;
