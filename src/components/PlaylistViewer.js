// Title: Navbar.js
// Author: Joel Harawa
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PlaylistViewer = () => {
    const { id } = useParams();
    return (
        <Playlist
            src={`https://open.spotify.com/embed/playlist/${id}`}
            frameBorder="0"
            allowTransparency="true"
            allow="encrypted-media"
        />
    )
}

const Playlist = styled.iframe`
    margin-top: 5%;
    width: 50%;
    height: 70%;
`;

export default PlaylistViewer;