import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils/format';

const Timer: React.FC = () => {
    const targetDate = new Date('2025-11-18T08:00:00+01:00').getTime();
    const [timeLeft, setTimeLeft] = useState<number>(targetDate - Date.now());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft(targetDate - Date.now());
        }, 1000);

        return () => clearInterval(timerId);
    }, [targetDate]);

    return (
        <div className="timer">
            <h1>Таймер до отправления</h1>
            <p>{formatTime(timeLeft)}</p>
        </div>
    );
};

export default Timer;