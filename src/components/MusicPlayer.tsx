import React, { useRef, useEffect } from 'react';
import { User } from '../types';
import GlassCard from './GlassCard';

interface MusicPlayerProps {
    user?: User;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ user }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    return (
        <GlassCard className="p-6 sm:p-8" ariaLabel="Музыкальный плеер">
            <div className="flex items-center gap-4">
                <button
                    className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 flex items-center justify-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_24px_var(--color-accent)]"
                    aria-label="Воспроизвести/Пауза"
                    onClick={() => {
                        const el = audioRef.current;
                        if (!el) return;
                        if (el.paused) {
                            el.play();
                        } else {
                            el.pause();
                        }
                    }}
                    tabIndex={0}
                >
                    <span className="sr-only">Play/Pause</span>
                    <div className="h-5 w-5 bg-white/80 rounded-sm" aria-hidden="true" />
                </button>
                <div className="flex-1">
                    <div className="text-sm text-white/80">Трек</div>
                    <div className="h-2 w-full mt-2 rounded-full bg-white/10">
                        <div className="h-2 w-1/3 rounded-full bg-white/40" />
                    </div>
                </div>
                <audio ref={audioRef} src="path/to/your/music/file.mp3" loop />
            </div>
        </GlassCard>
    );
};

export default MusicPlayer;