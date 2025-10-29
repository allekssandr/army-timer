import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import MusicPlayer from './components/MusicPlayer';
import GoogleAuth from './components/GoogleAuth';
import Bets from './components/Bets';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Здесь можно добавить логику для проверки аутентификации
    }, []);

    return (
        <div className="app">
            <h1>Army Timer</h1>
            {isAuthenticated ? (
                <>
                    <Timer />
                    <MusicPlayer />
                    <Bets />
                </>
            ) : (
                <GoogleAuth onAuthSuccess={() => setIsAuthenticated(true)} />
            )}
        </div>
    );
};

export default App;