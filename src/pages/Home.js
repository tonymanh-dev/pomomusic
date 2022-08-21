import React from 'react';
import Timer from '../components/Timer/Timer';
import Tasks from '../components/Tasks/Tasks';
import Music from '../components/Music/Music';
import About from '../components/About';

const Home = () => {
    return (
        <>
            <div
                className="container-fluid bg-primary"
                style={{
                    paddingTop: '60px',
                    paddingBottom: '60px',
                    width: '100%',
                }}
                id="home"
            >
                <Timer />
                <Tasks />
            </div>
            <div>
                <Music />
                <About />
            </div>
        </>
    );
};

export default Home;
