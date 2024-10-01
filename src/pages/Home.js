import Navbar from "../components/Navbar";
import styled from "styled-components";
import HomeContent from "../components/HomeContent";

const Home = () => {
    return (
        <Container>
            <Navbar/>
            <HomeContent/>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

export default Home;
