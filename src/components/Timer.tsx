import React, { useEffect, useState } from 'react';
import { User } from '../types';
import GlassCard from './GlassCard';
import { FlipCountdownTimer } from './countdown/FlipCountdownTimer';
import { getTimeParts } from "../utils/format";

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
            <h2 className="mb-4 text-sm sm:text-base uppercase tracking-[0.2em] text-white/70">Таймер до отправления</h2>
            <FlipCountdownTimer className="bg-transparent" target={new Date(targetDate)} />
            <div className="mt-3 text-xs sm:text-sm text-white/60">Обновление каждую секунду</div>
        </GlassCard>
    );
};

export default Timer;