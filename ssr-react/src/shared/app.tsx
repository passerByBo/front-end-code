import React, { useEffect } from "react";
import axios from 'axios'
import { Link, Route, Routes } from "react-router-dom";
import RenderRouter from './RenderRouter';
import Home from "./Home";
import About from "./About";

const App = () => {
    return (
        <div className="container">
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem"
                }}
            >
                <Link to="/">Home</Link> |{" "}
                <Link to="/about">About</Link>
            </nav>
            {/* <RenderRouter /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}

export default App;