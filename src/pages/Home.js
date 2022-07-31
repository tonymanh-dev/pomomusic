import React from 'react';
// import Timer from '../components/Timer';
import Timer from '../../src/components/Timer/Timer';
import Tasks from '../components/Tasks';

const Home = () => {
    return (
        <div className="container mt-5 ">
            <Timer />
            <Tasks />
        </div>
    );
};

export default Home;
