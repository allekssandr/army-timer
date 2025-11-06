import React, { memo } from 'react';
import { FlipDigit } from './FlipDigit';

interface TimeUnitDisplayProps {
    value: number;
    prevTens: number;
    prevOnes: number;
    label: string;
}

export const TimeUnitDisplay = memo(({ value, prevTens, prevOnes, label }: TimeUnitDisplayProps) => {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    return (
        <>
            <div className="flex">
                <FlipDigit value={tens} prevValue={prevTens} />
                <FlipDigit value={ones} prevValue={prevOnes} />
            </div>
            <span className="text-white text-xl md:text-3xl font-light ml-1 md:ml-2">{label}</span>
        </>
    );
});

TimeUnitDisplay.displayName = 'TimeUnitDisplay';


