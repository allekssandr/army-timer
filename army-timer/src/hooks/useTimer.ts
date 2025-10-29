import { useEffect, useState } from 'react';

const useTimer = (targetDate: Date) => {
    const [timeLeft, setTimeLeft] = useState(targetDate.getTime() - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(targetDate.getTime() - Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const formatTimeLeft = (time: number) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
    };

    return { timeLeft, formatTimeLeft };
};

export default useTimer;