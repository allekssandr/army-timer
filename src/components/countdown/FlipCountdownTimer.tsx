import React, { memo, useMemo, useRef, useEffect } from 'react';
import { FlipDigit } from './FlipDigit';
import { TimeUnitDisplay } from './TimeUnitDisplay';
import { useCountdown } from './useCountdown';
import { Card } from '../ui/Card';

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

interface FlipCountdownTimerProps {
    target: Date | { days?: number; hours?: number; minutes?: number; seconds?: number };
    labels?: Partial<Record<TimeUnit, string>>;
    className?: string;
    onComplete?: () => void;
}

export const FlipCountdownTimer = memo(({ target, labels = {}, className, onComplete }: FlipCountdownTimerProps) => {
    const defaultLabels = { days: 'д', hours: 'ч', minutes: 'м', seconds: 'с' };
    const finalLabels = { ...defaultLabels, ...labels };

    const targetDate = useMemo(() => {
        if (target instanceof Date) return target;
        const now = new Date();
        const { days = 0, hours = 0, minutes = 0, seconds = 0 } = target;
        return new Date(now.getTime() + days * 86400000 + hours * 3600000 + minutes * 60000 + seconds * 1000);
    }, [target]);

    const timeLeft = useCountdown({ target: targetDate, onComplete });
    const lastRef = useRef(timeLeft);
    useEffect(() => { lastRef.current = timeLeft; }, [timeLeft]);

    const prev = lastRef.current;
    const hoursTensPrev = Math.floor(prev.hours / 10);
    const hoursOnesPrev = prev.hours % 10;
    const minutesTensPrev = Math.floor(prev.minutes / 10);
    const minutesOnesPrev = prev.minutes % 10;
    const secondsTensPrev = Math.floor(prev.seconds / 10);
    const secondsOnesPrev = prev.seconds % 10;

    return (
            <div className={`${className} flex flex-wrap items-center justify-center gap-3 md:gap-5`}>
                {timeLeft.days > 0 && (
                    <>
                        <FlipDigit value={timeLeft.days} prevValue={prev.days} className="w-14 md:w-20" />
                        <span className="text-white text-xl md:text-3xl font-light">{finalLabels.days}</span>
                    </>
                )}
                <TimeUnitDisplay value={timeLeft.hours} prevTens={hoursTensPrev} prevOnes={hoursOnesPrev} label={finalLabels.hours} />
                <TimeUnitDisplay value={timeLeft.minutes} prevTens={minutesTensPrev} prevOnes={minutesOnesPrev} label={finalLabels.minutes} />
                <TimeUnitDisplay value={timeLeft.seconds} prevTens={secondsTensPrev} prevOnes={secondsOnesPrev} label={finalLabels.seconds} />
            </div>
    );
});

FlipCountdownTimer.displayName = 'FlipCountdownTimer';


