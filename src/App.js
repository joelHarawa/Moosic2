// Title: App.js
// Author: Joel Harawa
// Purpose: 

import React from "react";
import Home from "./pages/Home";
import AuthProvider from "./AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css"
const App = () => {
    // Routes in the application
    return(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;