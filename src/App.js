// Title: App.js
// Author: Joel Harawa

import Home from "./pages/Home";
import View from "./pages/View";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css"

const App = () => {
    // Main App Structure
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/view/:id" element={<View/>}/>
                </Routes>
            </BrowserRouter>
    )
}

export default App;