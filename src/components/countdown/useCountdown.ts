import { useState, useEffect, useRef } from 'react';

export interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface UseCountdownProps {
    target: Date;
    onComplete?: () => void;
}

export function useCountdown({ target, onComplete }: UseCountdownProps) {
    const calculateTimeLeft = (): TimeLeft => {
        const diff = target.getTime() - Date.now();

        if (diff <= 0) {
            onComplete?.();
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Очищаем старый интервал
        if (intervalRef.current) clearInterval(intervalRef.current);

        // Синхронизация: ждём до следующей секунды
        const now = Date.now();
        const msUntilNextSecond = 1000 - (now % 1000);

        const firstTick = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());

            // После первого тика — точный интервал
            intervalRef.current = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
        }, msUntilNextSecond);

        return () => {
            clearTimeout(firstTick);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [target, onComplete]);

    return timeLeft;
}