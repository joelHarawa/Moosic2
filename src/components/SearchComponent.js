// Title: SearchComponent.js
// Author: Joel Harawa
import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../AuthContext";
import styled, {keyframes} from "styled-components";

const SearchComponent = () => {
    let moodData = require("../data/moods.json")
    const [searchInput, setSearchInput] = useState("");
    const [username, setUsername] = useState("Guest");
const [artists, setArtists] = useState({});
    const { token, login } = useContext(AuthContext);
    console.log(token);

    useEffect(() => { 
        const fetchData = async () => {
            try {
                if (token) {
                    const userResponse = await fetch("https://api.spotify.com/v1/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const artistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });


                    if (!userResponse.ok || !artistsResponse.ok) {
                        throw new Error("Failed to fetch data");
                    }

                    const userData = await userResponse.json();
                    const artistData = await artistsResponse.json();

                    setUsername(userData.display_name || "Guest");
                    console.log(artistData.items);
                    setArtists(artistData.items);
                    console.log(userData);
                } else {
                    console.log("No token found, using default Guest username.");
                    setUsername("Guest");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setUsername("Guest");
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        console.log("Updated artists:", artists);
    }, [artists]);


    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    }

    const generatePlaylist = async (mood) => {
        try {
            if (token) {
                const response = await fetch("http://localhost:4000/api/post/generate", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: "HI",
                        userMood: mood
                    }),
                })
            } else {
                login();
            } 
        } catch (error) {
            console.error(error);
        }
    }

    const filteredMoods = moodData.moods.filter((mood) =>
        mood.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <SearchBox>
            <Greeting>
                <GreetingText>
                    Hi {username}, How are we feeling today?
                </GreetingText>
            </Greeting>
            <SearchArea>
            <SearchBar 
                placeholder="Enter your mood..."
                value={searchInput}
                onChange={handleSearch}
            />
            </SearchArea>
            {
                searchInput.length > 0 && (
                <Dropdown>
                    {
                        filteredMoods.map((mood, index) => (
                            <Result key={index} onClick={() => generatePlaylist(mood)}>{mood}</Result>
                        ))
                    }
                </Dropdown>
                )
            }
        </SearchBox>
    )
}

const AnimationName = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const SearchBox = styled.div`
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    height: 25%;
    width: 50%;
    border-radius: 25px;
    background-color: #2B2B2B;
`;

const Greeting = styled.div`
    display: flex;
    margin: 10px;
    width: 100%;
    height: 60%;
`;

const GreetingText = styled.a`
    font-family: "Poppins", system-ui;
    font-size: 2.5em;
    color: #4717F6;
    padding-left: 25px;
    padding-right: 25px;
`;

const SearchArea = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40%;
`;

const SearchBar = styled.input`
    font-family: "Poppins", system-ui;
    width: 90%;
    height: 30%;
    padding: 10px;
    border: none;
    border-radius: 25px;
    font-size: 1.5em;
    background-color: #2B2B2B;
    color: #A239CA;
    outline: none;
`;

const Dropdown = styled.ul`
    margin-top: 5%;
    width: 90%;
    list-style: none;
    padding-left: 0vh;
    background-color: #2B2B2B;
    border-radius: 25px;
    margin-left: 5%;
`;

const Result = styled.li`
    font-family: "Poppins", system-ui;
    color: #A239CA;
    font-size: 1.5em;
    padding: 10px;
    border-radius: 25px;
    margin: 0;
    &:hover {
        text-decoration: none;
        color: white;
        cursor: pointer;
        background: linear-gradient(270deg, #4717F6, #0E023A);
        background-size: 200% 200%;
        animation: ${AnimationName} 1s ease;
    }
`;

export default SearchComponent;