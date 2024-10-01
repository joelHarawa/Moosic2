// Title: App.js
// Author: Joel Harawa
// Purpose: 

import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css"
const App = () => {
    // Routes in the application
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;