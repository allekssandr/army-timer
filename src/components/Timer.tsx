import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils/format';
import { User } from '../types';
import GlassCard from './GlassCard';

interface TimerProps {
    user: User;
}

const Timer: React.FC<TimerProps> = ({ user }) => {
    const targetDate = new Date('2025-11-18T08:00:00+01:00').getTime();
    const [timeLeft, setTimeLeft] = useState<number>(targetDate - Date.now());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft(targetDate - Date.now());
        }, 1000);
        return () => clearInterval(timerId);
    }, [targetDate]);

    return (
        <GlassCard className="p-6 sm:p-8 md:p-10 text-center" ariaLabel="Таймер до отправления">
            <div className="flex flex-col items-center gap-3">
                <h2 className="text-sm sm:text-base uppercase tracking-[0.2em] text-white/70">Таймер до отправления</h2>
                <div className="font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl tabular-nums">
                    {formatTime(timeLeft)}
                </div>
                <div className="text-xs sm:text-sm text-white/60">Обновление каждую секунду</div>
            </div>
        </GlassCard>
    );
};

export default Timer;