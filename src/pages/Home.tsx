import React from 'react';
import Timer from '../components/Timer';
import MusicPlayer from '../components/MusicPlayer';
import GoogleAuth from '../components/GoogleAuth';
import Bets from '../components/Bets';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Army Timer</h1>
            <Timer />
            <MusicPlayer />
            <GoogleAuth />
            <Bets />
        </div>
    );
};

export default Home;