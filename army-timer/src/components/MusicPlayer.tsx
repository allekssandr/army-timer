import React, { useRef, useEffect } from 'react';

const MusicPlayer: React.FC = () => {
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
        <div>
            <audio ref={audioRef} src="path/to/your/music/file.mp3" loop />
            <p>Музыка играет...</p>
        </div>
    );
};

export default MusicPlayer;