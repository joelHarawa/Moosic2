// Title: App.js
// Author: Joel Harawa

import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css"

const App = () => {
    // Main App Structure
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
    )
}

export default App;