import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Pomodoro from './pages/Pomodoro';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import HowIsWork from './pages/HowIsWork';

function App() {
    return (
        <Router>
            <div className="container" style={{ maxWidth: '900px' }}>
                <Navbar />
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/pomodoro" element={<Pomodoro />} />
                    <Route path="/howiswork" element={<HowIsWork />} />
                    <Route path="/statistics" element={<Statistics />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
