// Title: SearchComponent.js
// Author: Joel Harawa

import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled, {keyframes} from "styled-components";
import Loading from "./Loading";

const SearchComponent = () => {
    // State variables
    const [filteredMoods, setFilteredMoods] = useState({});
    const [moodData, setMoodData] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [user, setUser] = useState("Guest");
    const [userID, setUserID] = useState("");
    // const [generating, setGenerating] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const apiUrl = "https://3.141.21.237/api/get/moods";
        // Get the user moods from the backend, update state variable
        const getMoods = async () => {
            try {
                // Fetch request to get the moods from the backend
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    setMoodData(Object.keys(data.moods));
                } else {
                    throw new Error("Failed to fetch moods");
                }
            } catch (error) {
                console.error("Error getting the moods from the user", error);
            }
        }
        getMoods();
    }, []);

    useEffect(() => {
        // Get the user profile, upadate user profile state variable
        const getUserProfile = async () => {
            try {
                const apiUrl = "https://3.141.21.237/api/auth/user";
                const response = await fetch(apiUrl, {
                    method: "GET",
                    credentials: "include"
                });
                if (response.status === 200) {
                    const rawData = await response.json();
                    const data = JSON.parse(rawData);
                    setUser(data.display_name);
                    setUserID(data.id);
                    console.log(data);
                }
            } catch (error) {
            }
        }
        getUserProfile();
    }, []);
    
    // Generate the user's desired playlist on their Sp
    const generatePlaylist = async (mood) => {
        try {
            if (user !== "Guest") {
                const apiUrl = "https://3.141.21.237/api/post/generate";
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userMood: mood,
                        userID: userID
                    }),
                    credentials: "include"
                })
                .then(response => response.json())  
                .then(data => {
                    console.log(data);
                    if (data.message) {
                        navigate(`view/${data.message}`);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } else {
                login();
            } 
        } catch (error) {
            console.error(error);
        }
    }

    // Update results in the dropdown menu when searching for emotions
    const handleSearch = (input) => { 
        setSearchInput(input);
        console.log(filteredMoods);
        if (!moodData || moodData.length <= 0) {
            console.error("moods is not an array");
            return {};  
        }
        const filtered = moodData.filter((mood) =>
            mood.toLowerCase().includes(input.toLowerCase())
        );
    
        setFilteredMoods(filtered);
    }

    return (
        <SearchBox>
            <Greeting>
                <GreetingText>
                    Hi {user}, How are we feeling today?
                </GreetingText>
            </Greeting>
            <SearchArea>
            <SearchBar 
                placeholder="Enter your mood..."
                onChange={(e) => handleSearch(e.target.value)}
            />
            </SearchArea>
                <Dropdown>
                    {
                        searchInput.length > 0 && filteredMoods.length > 0 ? (
                            filteredMoods.map((mood, index) => (
                                <Result key={index} onClick={() => generatePlaylist(mood)}>
                                        {mood}
                                </Result>
                            ))
                        ) : ""
                    }
                </Dropdown>
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
    margin-top: 2%;
`;

const Dropdown = styled.ul`
    margin-top: 2.5%;
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

const Generating = styled.h1`
    font-family: "Poppins", system-ui;
    color: #4717F6;
`;

export default SearchComponent;