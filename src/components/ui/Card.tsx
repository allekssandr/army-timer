import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={cn(
                'bg-black bg-opacity-50 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-2xl',
                className
            )}
        >
            {children}
        </div>
    );
}


