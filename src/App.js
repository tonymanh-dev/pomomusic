import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';

import Navbar from './components/Navbar/Navbar';
import Upload from './components/Navbar/Upload';
import MyPlaylist from './components/Navbar/MyPlaylist';
import Login from './components/Navbar/Login';
import Signup from './components/Navbar/Signup';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <UserProvider>
                <div className="container-fluid px-0 py-0 ">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/uploadmusic" element={<Upload />} />
                        <Route path="/myplaylist" element={<MyPlaylist />} />
                    </Routes>
                </div>
            </UserProvider>
        </Router>
    );
};

export default App;
