import React from 'react';

type GlassCardProps = {
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    tabIndex?: number;
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', ariaLabel, tabIndex = 0 }) => {
    const baseClasses =
        'rounded-2xl border border-white/10 ring-1 ring-white/5 bg-white/10 dark:bg-white/5 backdrop-blur-xl ' +
        'shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:bg-white/15 transition ' +
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]';

    return (
        <section
            className={`${baseClasses} ${className}`}
            aria-label={ariaLabel}
            tabIndex={tabIndex}
            role="region"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const target = e.target as HTMLElement;
                    target.click?.();
                }
            }}
        >
            {children}
        </section>
    );
};

export default GlassCard;


