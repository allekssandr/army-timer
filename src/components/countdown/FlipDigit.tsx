import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface FlipDigitProps {
    value: number;
    prevValue: number;
    className?: string;
}

export const FlipDigit = memo(({ value, prevValue, className }: FlipDigitProps) => {
    const isFlipping = value !== prevValue;
    return (
        <div className={cn('relative w-12 h-16 md:w-16 md:h-20', className)}>
            <AnimatePresence initial={false}>
                <motion.div
                    key={value}
                    className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl flex items-center justify-center text-white font-bold text-2xl md:text-4xl"
                    initial={isFlipping ? { rotateX: -180, opacity: 0 } : undefined}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 180, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {value}
                </motion.div>
            </AnimatePresence>
            {isFlipping && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg shadow-2xl flex items-center justify-center text-white font-bold text-2xl md:text-4xl"
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: 180 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {prevValue}
                </motion.div>
            )}
        </div>
    );
});

FlipDigit.displayName = 'FlipDigit';


