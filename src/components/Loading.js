// Title: Loading.js
// Author: Joel Harawa
import styled, {keyframes} from "styled-components";

// Display loading sign
const Loading = () => {
    return (
        <Animation>
        </Animation>
    )
}

// Define the keyframes for the animations
const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const Animation = styled.div`
    font-family: 'Playfair Display', serif;
    font-size: 40vh;
    position: relative;
    display: inline-block;
    animation: ${fadeIn} 2s ease-in-out infinite;
`;

export default Loading;