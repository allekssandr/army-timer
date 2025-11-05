export interface Bet {
    id: string;
    userId: string;
    amount: number;
    odds: number;
    createdAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    photoUrl?: string;
}

export interface Timer {
    targetDate: Date;
    remainingTime: number;
}

export interface MusicTrack {
    id: string;
    title: string;
    artist: string;
    url: string;
}