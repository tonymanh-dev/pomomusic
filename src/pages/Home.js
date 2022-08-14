import React from 'react';
import Timer from '../components/Timer/Index';
import Tasks from '../components/Tasks/Index';
import Music from '../components/Music/Music';
import Playlist from '../components/Music/Playlist';

const Home = () => {
    return (
        <div className="container pt-3 ">
            <Timer />
            <Tasks />
            {/* <Playlist /> */}
            <Music />
        </div>
    );
};

export default Home;
