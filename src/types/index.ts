export interface Bet {
    id: string;
    user_id: string;
    event_id: string;
    choice: string;
    amount: number;
    created_at: Date;
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

export interface EventItem {
    id: string;
    title: string;
    description?: string;
    createdBy?: string;
    status: 'open' | 'closed' | 'finished';
    createdAt: Date;
}

export interface EventChoice {
    id: string;
    eventId: string;
    title: string;
    createdAt: Date;
}

export type OddsByChoice = Record<string, number>;